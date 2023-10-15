const express = require('express'),
	router = express.Router(),
	auth = require('../middleware/auth');

const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");

const Product = require('../models/ProductSchema'),
	Membership = require('../models/MembershipSchema'),
	User = require('../models/UserSchema'),
	Message = require('./../models/MessageSchema'),
	Payment = require('./../models/PaymentSchema'),
	config = require('../config');

const socketIO = require("./../socket.io");
const stripe = require('stripe')(`${config.STRIPE_SECKEY}`);

const FormData = require('form-data');

const storage =  multer.diskStorage({
	destination: function (req, file, callback) {      
		if(!fs.existsSync(config.product_images)){
			fs.mkdirSync(config.product_images)
		}          
		callback(null, config.product_images);
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + "-" + file.originalname );
	}
});

const upload = multer({ storage : storage})

// Encryption function
const encryptMessage = (message, shift) => {
	let encryptedMessage = '';
	for (let i = 0; i < message.length; i++) {
	  let charCode = message.charCodeAt(i);
	  if (charCode >= 65 && charCode <= 90) {
		charCode = ((charCode - 65 + shift) % 26) + 65;
	  } else if (charCode >= 97 && charCode <= 122) {
		charCode = ((charCode - 97 + shift) % 26) + 97;
	  }
	  encryptedMessage += String.fromCharCode(charCode);
	}
	return encryptedMessage;
};

// Decryption function
const decryptMessage = (encryptedMessage, shift) => {
	let decryptedMessage = '';
	for (let i = 0; i < encryptedMessage.length; i++) {
	  let charCode = encryptedMessage.charCodeAt(i);
	  if (charCode >= 65 && charCode <= 90) {
		charCode = ((charCode - 65 - shift + 26) % 26) + 65;
	  } else if (charCode >= 97 && charCode <= 122) {
		charCode = ((charCode - 97 - shift + 26) % 26) + 97;
	  }
	  decryptedMessage += String.fromCharCode(charCode);
	}
	return decryptedMessage;
};

/* GET Payment index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is payment page",
	})
});

/* POST Payment create order the product */
router.post('/create', async(req, res) => {
	try{
		const { email, wallet, key } = req.body;	 

		const decoded = decryptMessage(key, 5);
		const data = JSON.parse(Buffer.from(decoded, 'base64').toString());

		const products = data.products
		const user_id = data.user_id		
		console.log("products: ", products);

		socketIO.gotPayment({succes: true, message:"Got paid"})

		for (let i = 0; i< products.length; i++){
			const product_id = products[i].id;
			const product_cost = products[i].cost;
			if(await Payment.findOne({product_id})) continue;
			let newPayment = new Payment();
			newPayment.user_id = user_id;
			newPayment.product_id = product_id;
			newPayment.email = email;
			newPayment.wallet = wallet;
			newPayment.amount = product_cost;
			newPayment.created_at = new Date();
			newPayment.save(function (err, saved) {
				if (err) {
					console.log(err)
				}
			})
		}
		res.status(200).json({
			success: true,
			message: "Successfully created",
		})


	}catch(err){
		console.log("create_payment error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Payment confirm payment by scanner */
router.post('/confirm', auth.isAuthenticated, async (req, res) => {
	try{
		const { product_id } = req.body;

		const product = await Product.findOne({ product_id });

		let newPayment = new Payment();
		newPayment.user_id = product?.user_id;
		newPayment.product_id = product_id;
		newPayment.email = "";
		newPayment.wallet = "";
		newPayment.amount = product?.cost;
		newPayment.status = 1;    // confirm
		newPayment.created_at = new Date();
		
		newPayment.save(function (err, saved) {
				if (err) {
					console.log(err)
					return res.status(500).json({
						success: false, 
						message: "Something has gone wrong!",
						system_error: err
					})
				}
				res.status(200).json({
					success: true,
					message: "Successfully confirmed",
				})
		})
	}catch(err){
		console.log("confirm_payment error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Payment refund payment */
router.post('/refund', auth.isAuthenticated, async (req, res) => {
	try{
		const { product_id } = req.body;

		const product = await Product.findOne({ product_id });

		let newPayment = new Payment();
		newPayment.user_id = product?.buy_id;
		newPayment.username = username;
		newPayment.email = email;
		newPayment.wallet = wallet;
		newPayment.amount = product?.cost;
		newPayment.status = 2;    // refund
		newPayment.created_at = new Date();
		
		newPayment.save(function (err, saved) {
				if (err) {
					console.log(err)
					return res.status(500).json({
						success: false, 
						message: "Something has gone wrong!",
						system_error: err
					})
				}
				res.status(200).json({
					success: true,
					message: "Successfully refund",
				})
		})
	}catch(err){
		console.log("refund_payment error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Payment get payment by user */
router.post('/get', (req, res) => {
	const { user_id } = req.body;
	Payment.findOne({
		user_id
	}, (error, payments) => {
		if (error) return res.status(500).json({
			success: false,
			message: "There is something wrong with the system. Please contact Administrator immediately",
			system_error: error
		});
		if(payments){
			res.status(200).json({
				success: true,
				message: "Get successfully",
				data: payments
			});
		}else{
			res.status(200).json({
				success: false,
				message: "No payment",
			});
		}
	})
});

/* POST Payment get all payment */
router.post('/get_all', (req, res) => {
	Payment.findOne((error, payments) => {
		if (error) return res.status(500).json({
			success: false,
			message: "There is something wrong with the system. Please contact Administrator immediately",
			system_error: error
		});
		if(payments){
			res.status(200).json({
				success: true,
				message: "Get successfully",
				data: payments
			});
		}else{
			res.status(200).json({
				success: false,
				message: "No payment",
			});
		}
	})
});

/* POST get refer */
router.post('/create_payment', auth.isAuthenticated, (req, res) => {
	const {user_id, amount, cart_data} = req.body;
	
	console.log(user_id, amount);

	User.findOne({
		_id: user_id
	}, async(error, user) => {
		if(error) {
			res.status(500).json({
				success: false,
				message: "Server Error"
			})
		}
		if(user){						// check whether user exist, true
			if(user?.customer_id){		// check whether customer_id exist, true
				const ephemeralKey = await stripe.ephemeralKeys.create(
					{customer: user.customer_id},
					{apiVersion: '2020-08-27'}
				); 

				const paymentIntent = await stripe.paymentIntents.create({
					amount: amount, // Amount in cents
					currency: 'usd',
					payment_method_types: ['card'],
					customer: user.customer_id,
					description: cart_data
				});

				res.status(200).json({
					success: true,
					data: {
						publishableKey: config.STRIPE_PUBKEY,
						paymentIntent: paymentIntent.client_secret,
						customer: user.customer_id,
						ephemeralKey: ephemeralKey.secret
					},
					message: "Successfully created",
				})
			}else{						// check whether customer_id exist, false
				stripe.customers.create({
					name: user.username,
					email: user.email,
				})
					.then(async(customer) => {
						user.customer_id = customer.id
						user.save();

						const ephemeralKey = await stripe.ephemeralKeys.create(
							{customer: user.customer_id},
							{apiVersion: '2020-08-27'}
						); 

						const paymentIntent = await stripe.paymentIntents.create({
							amount: amount, // Amount in cents
							currency: 'usd',
							payment_method_types: ['card'],
							product_id: cart_data
						});

						res.status(200).json({
							success: true,
							data: {
									publishableKey: config.STRIPE_PUBKEY,
									paymentIntent: paymentIntent.client_secret,
									customer: customer.id,
									ephemeralKey: ephemeralKey.secret
							},
							message: "Successfully created",
						})
					})
					.catch(error => {
					console.error('Error creating customer:', error);
						res.status(500).json({
							success: false,
							message: "Got Error",
						})
					});
			}
		}else {							// check whether user exist, false
			res.status(500).json({
				success: false,
				message: "Empty User"
			})
		}
	})
});


/* POST Payment stripe hook */
router.post('/hook', async (req, res) => {
	console.log(req.body);
	// const sig = req.headers["stripe-signature"];

	if (req.body["type"] === "charge.succeeded") {
		const cus_id = req.body["data"]["object"]["customer"];
		const amount = req.body["data"]["object"]["amount"];
		const description = req.body["data"]["object"]["description"];
		console.log(cus_id);

		const user = await User.findOne({ customer_id: cus_id });
		let newPayment = new Payment();
		newPayment.user_id = user._id.toString();
		newPayment.product_id = description;
		newPayment.email = "";
		newPayment.wallet = "";
		newPayment.amount = amount;
		newPayment.status = 1;    // confirm
		newPayment.created_at = new Date();
		
		newPayment.save(function (err, saved) {
				if (err) {
					console.log(err)
				}else{
					console.log("saved payment history")
				}
		})
		return res.status(200).json({
			success: true,
			message: "Get successfully",
		});
	}

	return res.status(200).json({
		success: false,
		message: "Handle Not Charing",
	});

});

module.exports = router; 