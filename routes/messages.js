const express = require('express'),
	router = express.Router(),
	auth = require('../middleware/auth');

const multer = require('multer');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const axios = require("axios");
const nodemailer = require("nodemailer");

const Product = require('../models/ProductSchema'),
	Membership = require('../models/MembershipSchema'),
	User = require('../models/UserSchema'),
	Message = require('./../models/MessageSchema'),
	config = require('../config');

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

const smtpTransport = nodemailer.createTransport({
    host: "your email server host",
    secure: true,
    port: 465,
    auth: {
      user: "your email server user",
      pass: "your pass",
    },
});

/* GET Product index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is message page",
	})
});

/* POST Message create msg  */
router.post('/create', auth.isAuthenticated, async(req, res) => {
	try{

		const { user_id, user_name, product_id } = req.body;

		const product = await Product.findOne({	product_id})
		if(!product) {
			res.status(200).json({
				success: false,
				message: "No product",
			})
		}

		let newMessage = new Message();

		newMessage.from_id = user_id;
		newMessage.product_id = product_id;
		newMessage.to_id = product.buy_id;
		newMessage.created_at = new Date();
		
		newMessage.save(function (err, saved) {
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
					message: "Successfully sent",
				})
		})
	}catch(err){
		console.log("sent_message error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Message get all messages */
router.post('/get_all', auth.isAuthenticated, (req, res) => {
	try{
		Message.find({
		}, (error, messages) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});

			res.status(200).json({
				success: true,
				message: messages,
			});
		})
	}catch(err){
		console.log("get_all error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Message get all messages */
router.post('/get_message',  async(req, res) => {
	try{
		const { user_id } = req.body;

		const users = await User.find({}).select('_id username phone');

		Message.find().or([{ from_id: user_id }, { to_id: user_id }])
		.exec((err, messages) => {
			if (err) {
				if (err) return res.status(500).json({
					success: false,
					message: "There is something wrong with the system. Please contact Administrator immediately",
					system_error: err
				});
				return;
			}
			res.status(200).json({
				success: true,
				message: "Successfully get message",
				data: messages,
				users
			});
		});
	}catch(err){
		console.log("get_message error:", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

const sendMail = async(email, content) => {
	const mailOptions = {
		from: "your sending email address", // sender address
		to:   `${email}`,
		subject: "Info from Texaglo",   // Subject line
		html :`
				${content}
			`
	};
	
	console.log("sending email end for nft ipfs uploading...")
	await smtpTransport.sendMail(mailOptions).catch(err=>console.log(err));
}

module.exports = router;