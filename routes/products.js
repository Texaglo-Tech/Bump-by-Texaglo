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

/* GET Product index */
router.get('/', (req, res) => {
	res.status(200).json({
		success: true,
		message: "This is product page",
	})
});

/* POST Product create order the product */
router.post('/create_order', auth.isAuthenticated, upload.single('file'), (req, res) => {
	try{

		const { product_name, product_cost, product_desc, product_type, product_link, product_payment, product_qrcode, user_id, wallet, product_id, edit } = req.body;

		if (edit){
			Product.findOne({
				product_id
			}, (error, product) => {
				if(error){
					console.log(err)
					return res.status(500).json({
						success: false, 
						message: "Something has gone wrong!",
						system_error: err
					})
				}
				if(product){
					product.product_name = product_name;
					product.product_cost = product_cost;
					product.product_desc = product_desc;
					product.product_type = product_type;
					product.product_link = product_link;
					product.product_payment = product_payment;
					product.product_qrcode = product_qrcode;
					product.user_id = user_id;
					product.product_file = req.file.filename;
					product.wallet = req.file.wallet;
					product.save();
					res.status(200).json({
						success: true,
						message: "Successfully updated",
						data: product
					})
				}else{
					res.status(200).json({
						success: true,
						message: "No Product",
					})
				}
			})
		}else{
			let newProduct = new Product();
		
			newProduct.product_id = uuidv4();
			newProduct.product_name = product_name;
			newProduct.product_cost = product_cost;
			newProduct.product_desc = product_desc;
			newProduct.product_type = product_type;
			newProduct.product_link = product_link;
			newProduct.product_payment = product_payment;
			newProduct.product_qrcode = product_qrcode;
			newProduct.user_id = user_id;
			newProduct.product_file = req.file.filename;
			newProduct.wallet = req.file.wallet;
			newProduct.created_at = new Date();
			
			newProduct.save(function (err, saved) {
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
						message: "Successfully created",
						data: newProduct
					})
			})
		}
	}catch(err){
		console.log("create_order error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Product get all products */
router.post('/get_products', auth.isAuthenticated, (req, res) => {
	try{

		Product.find({
		}, (error, products) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});

			res.status(200).json({
				success: true,
				message: products,
			});
		})

		
	}catch(err){
		console.log("get_order error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Product get one product */
router.post('/get_product', (req, res) => {
	const { product_id, type } = req.body;	// type: web or app
	Product.findOne({
		product_id
	}, (error, product) => {
		if (error) return res.status(500).json({
			success: false,
			message: "There is something wrong with the system. Please contact Administrator immediately",
			system_error: error
		});
		if(product){
			res.status(200).json({
				success: true,
				message: "Got successfully",
				data: product
			});
			if(type == "app" && product.payment_status == 1){
				product.payment_status = 2;
				product.save();
				const data = {
					product_id
				}
				axios.post(`${config.backend}/api/payment/confirm`, data).then((data)=>console.log("confirm payment: ",data)).catch((err)=> {console.log(err);return;});
			}
		}else{
			res.status(200).json({
				success: false,
				message: "No product",
			});
		}
	})
});

/* POST Product update the quantity of product */
router.post('/update_quantity', (req, res) => {
	try{
		const { quantity, product_id } = req.body;

		Product.findOne({
			product_id: product_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product){
				product.quantity = quantity;
				product.save()
				res.status(200).json({
					success: true,
					message: "Successfully updated",
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("update_quantity error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Product add membership discount */
router.post('/add_membership_discount', auth.isAuthenticated, (req, res) => {
	try{
		const { user_id, product_id, fee, percent } = req.body;
		Membership.findOne({
			user_id: user_id
		}, (error, membership) => {
			if(error) return res.status(500).json({
				success: false, 
				message: "Something has gone wrong!",
				system_error: error
			})
			if(membership){
				return res.status(200).json({
					success: false, 
					message: "Duplication membership",
					system_error: error
				})
			}else{
				let newMembership = new Membership();
	
				newMembership.product_id = product_id;
				newMembership.user_id = user_id;
				newMembership.fee = fee;
				newMembership.percent = percent;
		
				newMembership.created_at = new Date();
				
				newMembership.save(function (err, saved) {
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
							message: "Successfully created",
							data: newMembership
						})
				})
			}
		})
		

	}catch(err){
		console.log("add_membership_discount error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Product get product summary */
router.post('/get_product_summary', auth.isAuthenticated, (req, res) => {
	try{
		const { user_id } = req.body;

		User.findOne({
			_id: user_id
		}, async(error, user) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(user){
				const local_sales = await Product.find({user_id: user_id, product_type: "local"}).catch((err)=> { console.log(err);return []})
				const online_sales = await Product.find({user_id: user_id, product_type: "digital"}).catch((err)=> { console.log(err);return []})
				const data = {
					scans_cnt: user.scans_cnt,
					clicks_cnt: user.clicks_cnt,
					online_sales_cnt: online_sales.length,
					local_sales_cnt: local_sales.length
				}
				
				res.status(200).json({
					success: true,
					message: "Success",
					data
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("get_product_summary error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Product Scan */
router.post('/scan_product', auth.isAuthenticated, (req, res) => {
	try{
		const { product_id } = req.body;

		Product.findOne({
			_id: product_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product){
				User.findOne({
					_id: product.user_id
				}).then((user=>{
					if(user){
						user.scans_cnt += 1;
						user.clicks_cnt += 1;
						user.save()
					}
				}))

				res.status(200).json({
					success: true,
					message: "Success",
					product
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("scan_product error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Product get product summary */
router.post('/get_summary', auth.isAuthenticated, (req, res) => {
	try{
		const { user_id } = req.body;

		Product.find({
			user_id: user_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product.length > 0){
				const data = {
					cash_flow: 0,
					crypto_flow: 0,
					review: 0,
					male:0,
					female:0,
					happy:0,
					unhappy:0,
					click_to:0,
					collected_data: [0, 1, 2, 6, 5, 1,3,4,5,6,8,9,10]
				}
				
				res.status(200).json({
					success: true,
					message: "Success",
					data
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("get_summary error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Product upload the item images for product */
router.post('/upload_img_for_item', auth.isAuthenticated, upload.single('file'), (req, res) => {
	try{
		const { user_id, product_id } = req.body;

		Product.findOne({
			product_id: product_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product){
				product.item_imgs.push(req.file.filename);
				product.save()
				res.status(200).json({
					success: true,
					message: "Successfully updated",
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("uploading img for item error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

/* POST Product customize and deply for product */
router.post('/customize_deploy', auth.isAuthenticated, (req, res) => {
	try{
		const { background_color, button1_color, button2_color, buy_color, website, link, product_id, user_id } = req.body;

		Product.findOne({
			product_id: product_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product){
				product.background_color = background_color
				product.button1_color = button1_color
				product.button2_color = button2_color
				product.buy_color = buy_color
				product.website = website
				product.link = link
				product.save()
				res.status(200).json({
					success: true,
					message: "Successfully deployed",
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("customize deploy error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Product Survey questions, answers */
router.post('/survey_deploy', auth.isAuthenticated, (req, res) => {
	try{
		const { survey, answers, questions, product_id } = req.body;
		
		Product.findOne({
			product_id: product_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product){
				product.survey = survey
				product.answers = answers
				product.questions = questions
				product.save()
				res.status(200).json({
					success: true,
					message: "Successfully deployed",
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("survey deploy error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});


/* POST Product AI Bot deploy */
router.post('/ai_deploy', auth.isAuthenticated, upload.single('file'), async (req, res) => {
	try{
		const { ai, product_id, user_id } = req.body;
		
		const formData = new FormData();
		formData.append("file", fs.createReadStream(`${config.product_images}/${req.file.filename}`));
	  
		const options = {
		  headers: {
			"x-api-key": config.chatpdf_api_key,
			...formData.getHeaders(),
		  },
		};
	  
		const chatpdf_source = await axios.post("https://api.chatpdf.com/v1/sources/add-file", formData, options).catch((err)=> {console.log(err);return;});		  
		console.log("chatpdf_source: ", chatpdf_source?.data?.sourceId);

		Product.findOne({
			product_id: product_id
		}, (error, product) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
			if(product){
				product.ai = ai
				product.bot_file_path = req?.file?.filename;
				product.chatpdf_source = chatpdf_source?.data?.sourceId;
				product.save();
				res.status(200).json({
					success: true,
					message: "Successfully deployed",
				});
			}else{
				res.status(200).json({
					success: false,
					message: "No product",
				});
			}
		})

	}catch(err){
		console.log("ai deploy error-> ", err)
		res.status(500).json({
			success: false, 
			message: "Something has gone wrong",
			system_error: err
		})
	}
});

router.post("/ai_chat", async (req, res) => {
	const { msg, type, product_id} = req.body;
	if(type == "chatpdf"){

		let chatpdf_source = '';
		if(product_id == "technoking") chatpdf_source = "src_JY04LVpEONaByOHdDAPkt"
		else{
			const product = await Product.findOne({ product_id: product_id })
			if(product?.chatpdf_source) chatpdf_source = product.chatpdf_source;
		}

		if(chatpdf_source == '') {
			res.json({
				success: false,
				message: "No product pdf file",
			});
			return;
		}
		
		const header = {
			headers: {
			"x-api-key": config.chatpdf_api_key,
			"Content-Type": "application/json",
			},
		};

	
		const data = {
			sourceId: chatpdf_source,
			messages: [
			{
				role: "user",
				content: msg,
			},
			],
		};
	
		axios
			.post("https://api.chatpdf.com/v1/chats/message", data, header)
			.then((res_data) => {
				res.json({
					success: true,
					message: "got result successfully",
					data: res_data.data.content,
				});
			})
			.catch((error) => {
			console.error("error:", error.message);
			res.json({
				success: false,
				message: "Server Error",
				system_error: error.message
				});
		});
			 
	}else{
		const client = axios.create({
			headers: {
				Authorization: "Bearer " + config.chatgpt_api_key,
			},
		});
	
		const params = {
			prompt: msg,
			model: "text-davinci-003",
			max_tokens: 2048,
			temperature: 0,
		};
	
		client
			.post("https://api.openai.com/v1/completions", params)
			.then((data) => {
				console.log(data.data)
				res.json({
					success: true,
					message: "Got successfully",
					data: data.data.choices[0].text
				  });
			})
			.catch((error) => {
				console.error(error)
				res.json({
					success: false,
					message: "Server Error",
				});
			});
	}
	
});




module.exports = router;