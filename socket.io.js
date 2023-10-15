#!/usr/bin/env node

const http = require('http'),
	 app = require('./app')

const generateID = () => Math.random().toString(36).substring(2, 10);

const server = http.createServer(app);
const socketIO = require("socket.io")(server, {
		cors: {
			origin: '*',
			allowedHeaders: ['Content-Type'],
		  }
});

socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	const userId = socket.id;
	console.log(userId)

	// Get the count of all connected sockets
	const socketCount = socketIO.sockets.sockets.size;
	console.log('Connected sockets count:', socketCount);

	socket.on("msg_to_owner", (msg) => {
		console.log("msg_to_owner-> ")
		console.log(msg) 
		// socket.emit("msg_from_user","hi, understand, now will give you, s")
		socketIO.to(userId).emit('msg_from_user', "hi, understand, will")

	});

	socket.on("msg_to_user", (msg) => {
		console.log("msg_to_user-> ")
		console.log(msg)
		socket.emit("msg_from_owner","hi")
	});

	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("🔥: A user disconnected");
	});

});

const gotPayment = (data) => {
	try{
		console.log(data)
		socketIO.emit("got", data);		
	}catch(err){
		console.log(err)
	}
}
 
exports.gotPayment = gotPayment

module.exports = {socketIO, server, app};
