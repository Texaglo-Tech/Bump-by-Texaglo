var fs = require('fs');                                         //require filesystem module
var Gpio = require('onoff').Gpio;                               //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out');                                   //use GPIO pin 4 as output
var os = require('os');

const { io } = require("socket.io-client");
const axios = require('axios');
const express = require("express");
const cors = require("cors");
const text = require('body-parser').text;
const json = require('body-parser').json;
const urlencoded = require('body-parser').urlencoded;
const path = require('path');
const app = express();
const router = express.Router();


app.use(text());
app.use(json({limit: '500mb'}));
app.use(urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.options("*", cors());

const port = Number(process.env.PORT || 8080);
const public = path.join(__dirname, "/frontend/build");
const API = "https://crossmint-backend.texaglo.com";

const total_products = [];

app.use('/', express.static(public));
app.use(router)

var interfaces = os.networkInterfaces();
var addresses = [];                                             // my IP address
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

app.listen(port, null, function() {
  console.log(`🚀 Server running on port ${port}!`);
});

router.post("/register", async(req, res) => {
  try{
    const gateLink =  req.body.link;
    const wallet = req.body.wallet;

    const data = {
      gateLink: gateLink,
      wallet: wallet
    }
  
    const resData = await axios.post(`https://ipfs.texaglo.com/api/subdomain/check-ticket`, data);
    if(resData && resData?.data) {
      LED.writeSync(1);
      res.json({success: true, data: resData.data});
    }else{
      res.json({success: false, message:"Ticket does not exist"});
    }

  }catch(err){
      console.log(err)
      res.json({success:false});
  }
});


router.post("/products", async(req, res) => {
  try{
    const { products } = req.body;
    total_products.concat(products);
    
    res.json({success:true});
  }catch(err){
      console.log(err)
      res.json({success: false, err});
  }
});
 
process.on('SIGINT', function () {                //on ctrl+c
  LED.writeSync(0);                               // Turn LED off
  LED.unexport();                                 // Unexport LED GPIO to free resources
  process.exit();                                 //exit completely
});


const socketIO = io(API);

socketIO.on("connect", ()=>{
  console.log("connected", socketIO?.id);
});

socketIO.on("product", (data) => {
  console.log("data", data);  // { product_id:""}
  if(data?.product_id && total_products.includes(data.product_id)){
    console.log("This is added product!");
    console.log("turn on:", data?.product_id)
    LED.writeSync(1);
    setTimeout(()=>{
      LED.writeSync(0);
      console.log("turn off:", data?.product_id)
    }, 10000)
  }else{
    console.log("You need to add this product!");
  }
});

socketIO.on("disconnect", () => {
  console.log("Disconnected");
});

socketIO.on("reconnect", () => {
  console.log("Reconnecting");
});

