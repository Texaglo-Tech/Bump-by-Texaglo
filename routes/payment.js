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

const stripe = require('stripe')(`${config.STRIPE_SECKEY}`);

const FormData = require('form-data');
const { createNFTWithUnderdog } = require('../utils/underdog');
const { mint } = require('../utils/crossmint');

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

/* GET Payment index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is payment page",
	})
});

/* POST Payment confirm payment by scanner */
router.post('/confirm', async (req, res) => {
	try{
		const { product_id, user_id } = req.body;

		const product = await Product.findOne({ product_id });

		product.payment_status = 2; // release
		product.save();
		
		const payment = await Payment.findOne({ product_id: product_id, user_id: user_id });
		payment.status = 1; // release milestone
		payment.save();


		const user = await User.findOne({_id: product.user_id});
		
		// calling transfter to vendor
		
		const balance = await stripe.balance.retrieve();
		console.log("balanace: ", balance)
		
		const transfer = await stripe.transfers.create({
			amount: product.product_cost,
			currency: 'usd',
			destination: user.stripe_account,
		});
 
		console.log(transfer);
		console.log(transfer?.balance_transaction);

		res.status(200).json({
			success: true,
			message: "Successfully confirmed",
		})
	}catch(err){
		console.log("confirm_payment error:", err)
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
		const { product_id, user_id } = req.body;
		const payment = await Payment.findOne({product_id, user_id})		
			
		const refund = await stripe.refunds.create({
			charge: payment.transaction,
		});

		payment.status = 2;
		payment.save();

		console.log('Refund ID:', refund.id);
		console.log('Refund Amount:', refund.amount);

		const product = await Product.findOne({product_id});
		product.buy_id = "";
		product.payment_status = 0;
		product.save();
		
		res.status(200).json({
			success: true,
			message: "Successfully refund",
		})

	}catch(err){
		console.log("refund_payment error", err)
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
	Payment.find((error, payments) => {
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

/* POST get create_payment */
router.post('/create_payment', auth.isAuthenticated, async(req, res) => {
	const {user_id, amount, cart_data} = req.body;
	
	console.log(user_id, amount);

	const products = JSON.parse(cart_data)?.products;
	let flag = false;  // check the product payment status
	for(let i = 0; i<products.length; i++){
		const product = await Product.findOne({product_id: products[i]})
		if(product?.payment_status == 1 || product?.payment_status == 2) flag = true;
	}

	if(flag) return res.status(200).json({
		success: false,
		message: "It's already claimed"
	})
	

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
					amount: Number(amount) * 100, // Amount in cents
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
							amount: Number(amount) * 100, // Amount in cents
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
	// const sig = req.headers["stripe-signature"];

	if (req.body["type"] === "charge.succeeded") {
		const id = req.body["data"]["object"]["id"];
		const cus_id = req.body["data"]["object"]["customer"];
		const amount = req.body["data"]["object"]["amount"];
		const description = req.body["data"]["object"]["description"];
		console.log(cus_id);

		const user = await User.findOne({ customer_id: cus_id });
		
		console.log(req.body)
		console.log(description)

		const products = JSON.parse(description)?.products;
		const products_cost = JSON.parse(description)?.products_cost;		
		const products_img = JSON.parse(description)?.products_img;		
		products.map(async(item, index) => {
			const data = await mint("", user?.publicKey, `${config.backend}/${products_img[index]}`);
			
			console.log(data);
			console.log("item: ", item);

			
			const product = await Product.findOne({ product_id: item });
			product.payment_status = 1; 
			product.buy_id = user._id.toString();
			product.save();

			let newPayment = new Payment();
			newPayment.user_id = user._id.toString();
			newPayment.product_id = item;
			newPayment.email = user.email;
			newPayment.wallet = user.publicKey;
			newPayment.amount = products_cost[index];
			newPayment.status = 0;    // confirm
			newPayment.transaction = id;  // transaction
			newPayment.created_at = new Date();

			newPayment.nft_status = "pending";  
			if(data.success){ 
				newPayment.action_id = data?.message?.actionId;  // crossmint actionId
			}
			
			newPayment.save(function (err, saved) {
					if (err) {
						console.log(err)
					}else{
						console.log("saved payment history")
					}
			})
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


/* POST Payment get_oauth */
router.post("/get_oauth", async (req, res) => {
	const {user_id} = req.body;
	const args = new URLSearchParams({
	  state:user_id,
	  client_id: config.STRIPE_CLIENT_ID,
	  scope: "read_write",
	  response_type: "code",
	})
	const url = `https://connect.stripe.com/oauth/authorize?${args.toString()}`;
	return res.send({success: true, message:url});
});

/* GET Payment authorize_oauth */
router.get("/authorize_oauth", async (req, res) => {
	const { code, state } = req.query;
	console.log(code, state)
	if(!state) {
		return res.redirect(301, `${config.FRONTEND_URL}/error`)
	}
  
	// Send the authorization code to Stripe's API.
	stripe.oauth.token({
	  grant_type: 'authorization_code',
	  code
	}).then(
	  async(response) => {
		var connected_account_id = response.stripe_user_id;
		const user = await User.findOne({_id: state});
		user.stripe_account = connected_account_id;
		user.save();

		console.log(connected_account_id)
		// Render frontend page.
		return res.redirect(301, `${config.FRONTEND_URL}/success`)
	  },
		(err) => {
			console.log(err)
			return res.redirect(301, `${config.FRONTEND_URL}/error`)
	  }
	);
  });
  



module.exports = router; 