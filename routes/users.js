const express = require('express'),
	router = express.Router(),
	jwt = require('jsonwebtoken'),
	jwtdecode = require('jwt-decode'),
	auth = require('../middleware/auth'),
    bcrypt = require('bcrypt');


const twilio = require('twilio');

const User = require('../models/UserSchema'),
	config = require('../config');

const client = twilio(config.AccountSid, config.AuthToken);

const getHash = async(password)=>{
	try{
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password, salt)
	}catch(err){
		console.log(err)
	}
}

/* POST User register */
/**
 * @swagger
 * /api/auth/register:
 *  post: 
 *    consumes:
 *      - application/json
 *    parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *             - phone
 *             - email
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             phone:
 *                type: string
 *             email:
 *                type: string
 *             refer_id:
 *                type: string
 *    description: Register user
 *    tags:
 *       - User
 *    responses:
 *      '200': 
 *        description: "{success: true, message:'successfully created' }"
 */
 
router.post('/register', async(req, res) => {
	const { username, password, email, phone, refer_id } = req.body;
	let newUser = new User();

	newUser.username = username;
	newUser.password = await getHash(password);
	newUser.email = email;
	newUser.phone = phone;

	newUser.created_at = new Date();
	newUser.updated_at = new Date();

	newUser.save(function (err, saved) {
		try {
			if (err) {
				console.log(err)
				return res.status(200).json({
					success: false, 
					message: "Duplication username",
					system_error: err
				})
			}

			res.status(200).json({
				success: true,
				message: "Successfully registered",
			})

			/* save refer id*/
			User.findOne({
				_id: refer_id
			}, (error, user) => {

				if(error) return

				if(!user) return;
				const temp = user?.refer
				let flag = true
				
				for(let i = 0; i < temp.length; i++){
					if(temp[i].id == refer_id){
						flag = false
						break;
					}
				}
				if(flag){
					user.points = user?.points + config.points;
					user.refer.push({id: newUser._id.toString(), name: username, email: email})
					user.save()
				}				
			})

			
		}
		catch(e) {
			console.log(e)
			res.status(200).json({
				success: false, 
				message: "Something has gone wrong",
				system_error: e
			})
		}
	})
});


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: User login
 *     tags:
 *       - User
 *     parameters:
 *       - name: email
 *         in: formData
 *         description: email
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         description: password
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "{success: true, message:'successfully logined' }"
 */

/* POST User login */
router.post('/login', (req, res) => {
	const option = req.body.option
	if(option == "phone"){
		const phone = req.body.phone;
		User.findOne({
			phone
		}, (error, user) => {
			if (error) return res.status(500).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});

			if (user) {

				client.verify
				.v2.services(config.SERVICE_SID)
				.verifications
				.create({ 
				  to: phone, 
				  channel: 'sms',
				  friendlyName: 'Texaglo',
			  	})
				.then(() => {				
					return res.status(200).json({
						success: true,
						message: "Verification code sent successfully",
					});
				})
				.catch((error) => {
					console.error(error);
					return res.status(200).json({
						success: false,
						message: "Error sending verification code",
					});
				});
			}else {
				res.status(200).json({
					success: false,
					message: "Not Registered Phone",
					result: {}
				})
			}
		})
		
	}else{
		User.findOne({
			email: req.body.email
		}, (error, user) => {
			if (error) return res.status(200).json({
				success: false,
				message: "There is something wrong with the system. Please contact Administrator immediately",
				system_error: error
			});
	
			if (user) {
				user.comparePassword(req.body.password, (err, isMatch) => {
					console.log(err, req.body.password, isMatch, "isMatch")
					if(error) {
						return res.status(500).json({
							success: false,
							message: "Error",
							system_error: error
						})
					}
	
					if (isMatch) {
						user.last_login = new Date();
						user.save();
	
						var token = jwt.sign({
							id: user._id,
							email: user.email,
							username: user.username,
							points: user.points
						}, config.JWT_SECRET, { expiresIn: '1h' });
						res.header('Authorization', `Bearer ${token}`);
						res.cookie('token', token).status(200).json({
							success: true,
							message: "Successfully logined",
							result: {},
							token
						})

					} else {
						res.status(200).json({
							success: false,
							message: "Invalid Username/Password",
							result: {}
						})
					}
				});
			} else {
				res.status(200).json({
					success: false,
					message: "No user found",
					result: {}
				})
			}
		});
	}
	
});

// Verify the received code
router.post('/verifycode', (req, res) => {
	const {phone, code} = req.body
	client.verify
		.services(config.SERVICE_SID)
		.verificationChecks
		.create({ to: phone, code: code })
		.then((verificationCheck) => {
			if (verificationCheck.status === 'approved') {
				User.findOne({
					phone
				}, (error, user) => {
					if(error) {
						return res.status(200).json({
							success: false,
							message: "Invalid Code"
						})
					}
					if(user){
						var token = jwt.sign({
							id: user._id,
							email: user.email,
							username: user.username,
							points: user.points
						}, config.JWT_SECRET, { expiresIn: '1h' });	
						res.header('Authorization', `Bearer ${token}`);
						return res.cookie('token', token).status(200).json({
							success: true,
							message: "Successfully verified",
							result: {},
							token
						})
					}else {
						res.status(200).json({
							success: false,
							message: "Empty User"
						})
					}
				})
				
			} else {
				res.status(203).json({
					success: false,
					message: "Invalid verification code", 
				})
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(200).json({
				success: false,
				message: "Error verifying code",
				system_error: {}
			})
		});
});

/* GET Current user token */
router.get('/verify', auth.isAuthenticated, (req, res) => {
	res.sendStatus(200);
})

/* GET Current user profile */
router.get('/whoami', auth.isAuthenticated, (req, res) => {
	const token =
		req.body.token ||
		req.query.token ||
		req.headers['x-access-token'] ||
		req.headers.authorization ||
		req.cookies.token;

	if (token) {
		let data = jwtdecode(token);
		res.status(200).json({
			success: true,
			message: "Successfully get user name",
			result: data.username
		});
	} else {
		res.status(401).json({
			success: false,
			message: "You are not logged in",
		})
	}
})

/* GET Logout */
router.get('/logout', auth.isAuthenticated, (req, res) => {
	if (token) {
		res.status(200).json({
			success: true,
			message: "Successfully logout",
		});
	} else {
		res.status(401).json({
			success: false,
			message: "Server Error",
		})
	}
})

/* POST forgot_password */
router.post('/forgot_password', (req, res) => {
	const { mail } = req.body;
	
	User.findOne({
		email: mail
	}, (error, user) => {
		if(error) {
			return res.status(500).json({
				success: false,
				message: "Server Error"
			})
		}
		if(user){
			/* email sending */
			return res.status(200).json({
				success: true,
				message: "Successfully sent",
			})
		}else {
			res.status(500).json({
				success: false,
				message: "Empty User"
			})
		}
	})	
});

/* POST get refer */
router.post('/get_refer', auth.isAuthenticated, (req, res) => {
	const {user_id} = req.body;
	
	User.findOne({
		_id: user_id
	}, (error, user) => {
		if(error) {
			res.status(500).json({
				success: false,
				message: "Server Error"
			})
		}
		if(user){
			/* email sending */
			res.status(200).json({
				success: true,
				data: user.refer,
				message: "Successfully got",
			})
		}else {
			res.status(500).json({
				success: false,
				message: "Empty User"
			})
		}
	})
});

/* POST update user info */
router.post('/:username',  auth.isAuthenticated, (req, res) => {
	res.status(200).json({
		success: true,
		data: req.params.username,
		message: "Successfully updated",
	});
});

/* GET get detail according to username */
router.get('/:username',  auth.isAuthenticated, (req, res) => {
	res.status(200).json({
		success: true,
		data: req.params.username,
		message: "Successfully updated",
	});
})

module.exports = router;