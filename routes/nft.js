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
	config = require('../config');

const FormData = require('form-data');
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

/* GET NFT index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is nft page",
	})
});

/* POST NFT create */
router.post('/create', auth.isAuthenticated, async (req, res) => {
	const { wallet, token, image, description } = req.body;
	if(!token == 123) return res.status(200).json({
		success: false,
		message: "Invalid Token",
	}) 
	const data = await mint("", wallet, image);
	if(data.success){ 
		const actionId = data.message.actionId;
		res.status(200).json({
			success: true,
			message: "Successfully created",
		}) 
	}else {
		res.status(200).json({
			success: false,
			message: "Server Error",
		})
	}
	
});

/* GET NFT get all NFT */
router.get('/get_all', auth.isAuthenticated, (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Successfully",
	});
});

/* POST NFT update */
router.post('/update', (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Successfully",
	});
});

/* GET NFT update */
router.get('/:mint_address', (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Successfully",
	});
});

/* DELETE NFT */
router.delete('/:mint_address', (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Successfully",
	});
});

			


module.exports = router;