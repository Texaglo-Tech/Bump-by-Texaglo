#!/usr/bin/env node

const http = require('http'),
	 app = require('../app')

const Product = require('../models/ProductSchema');
const Message = require('../models/MessageSchema');

const generateID = () => Math.random().toString(36).substring(2, 10);

const server = http.createServer(app);
const socketIO = require("socket.io")(server, {
		cors: {
			origin: '*',
			allowedHeaders: ['Content-Type'],
		  }
});

let users = []

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);

	// Get the count of all connected sockets
	const socketCount = socketIO.sockets.sockets.size;
	console.log('Connected sockets count:', socketCount);

	const msg = {user_id:"admin", product_id:"", message:"Welcome To Texaglo", type:"alert"}
	socketIO.to(socket.id).emit('message', msg)

	socket.on("login", (data) => {
		console.log("login:", data);
		users.push(data)
	});

	socket.on("message", async(data) => {
		console.log("message:", data);
		const { product_id, user_id, to_id, message, type } = data;
		const product = await Product.findOne({product_id});
		
		
		// save in db
		let newMessage = new Message({
			from_id: user_id, product_id: type == "product" ? product_id :"",
			message, to_id: type == "product"? product.buy_id: to_id, created_at: new Date() })
		await newMessage.save();

		const user = users.filter(user => user.user_id == product?.buy_id || user.user_id == to_id)
		if(user.length>0){
			const new_msg = await Message.findOne({_id: newMessage._id.toString()});
			new_msg.read = true;
			new_msg.save();
		}

		const msg = {
			message:{
				from_id: user_id,
				product_id: type == "product"?product_id:"",
				to_id: type == "product"?product.buy_id:to_id,
				message: message, 
				read: user.length>0 ?true:false,
				created_at: new Date(),
				_id: newMessage._id.toString(),
			},
			type: "private",
		}
		console.log(msg);
		if(user.length>0){
			console.log(user[0]);
			socketIO.to(user[0].socket).emit('message', msg)
		}
		socketIO.to(socket.id).emit('message', msg)
	});

	socket.on("read", async(data) => { 
		console.log("read:", data);
		const { user_id } = data;
		Message.updateMany(
			{ from_id: user_id }, // Filter condition
			{ $set: { read: true } } // Update value
		  )
			.then(result => {
			  console.log(`${result.modifiedCount} documents updated`);
			})
			.catch(error => {
			  console.error('Error updating documents:', error);
			});
	})

	socket.on("typing", (data)=>{
		console.log("typing:", data)
		socket.broadcast.emit("typing", data)
	})

	socket.on("disconnect", () => {
		users = users.filter(user => user.socket !== socket.id)
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});

});

const gotPayment = (data) => {
	try{
		console.log(data)
		socketIO.emit("message", data);		
	}catch(err){
		console.log(err)
	}
}
 
exports.gotPayment = gotPayment

module.exports = {socketIO, server, app};
