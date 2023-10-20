const config = require("./../config");
const axios = require("axios")
const Payment = require('./../models/PaymentSchema')
const User = require('./../models/UserSchema')
const Product = require('./../models/ProductSchema')

const mint = async (email, wallet, image = "https://www.crossmint.com/assets/crossmint/logo.png") => {
    
const options = {
    method: 'POST',
    url: `https://staging.crossmint.com/api/2022-06-09/collections/${config.CROSSMINT_COLLECTION_ID}/nfts`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'x-client-secret': `${config.CROSSMINT_SECRET_KEY}`,
      'x-project-id': `${config.CROSSMINT_PROJECT_ID}`
    },
    data: {
      recipient: email != ""? `email:${email}:solana`: `solana:${wallet}`,
      metadata: {
        name: 'Texaglo',
        image: image,
        description: 'Texaglo service'
      },
      compressed: false
    }
  };

    return await axios(options)
    .then(function (response) {
        return {success: true, message: response.data}
    })
    .catch(function (error) {
        return {success: false, message: error}
    });
}

const mintCompressedNFT = ()=>{
    const options = {
    method: 'POST',
    url: 'https://staging.crossmint.com/api/v1-alpha1/minting/collections/default-solana/nfts',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-client-secret': 'secret',
        'x-project-id': 'project_id'
    },
    data: {
        recipient: 'email:replaceme@youruser.com:solana',
        reuploadLinkedFiles: true,
        metadata: {
        name: 'My first Mint API NFT',
        image: 'https://www.crossmint.com/assets/crossmint/logo.png',
        description: 'My NFT created via the mint API!',
        animation_url: 'string',
        attributes: [{display_type: 'boost_number', trait_type: 'string', value: 'string'}]
        }
    }
    };

    axios(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

const mintIdempotent = ()=>{
    const options = {
    method: 'PUT',
    url: 'https://staging.crossmint.com/api/2022-06-09/collections/default-solana/nfts/my-idempotent-nft-name',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-client-secret': 'secret',
        'x-project-id': 'project_id'
    },
    data: {
        recipient: 'email:replaceme@youruser.com:solana',
        reuploadLinkedFiles: true,
        compressed: true,
        metadata: {
        name: 'My first Mint API NFT',
        image: 'https://www.crossmint.com/assets/crossmint/logo.png',
        description: 'My NFT created via the mint API!',
        animation_url: 'string',
        attributes: [{display_type: 'boost_number', trait_type: 'string', value: 'string'}]
        }
    }
    };

    axios(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

const mintIdempotentCompressed = ()=>{
    const options = {
        method: 'PUT',
        url: 'https://staging.crossmint.com/api/v1-alpha1/minting/collections/default-solana/nfts/my-idempotent-nft-name',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-client-secret': 'secret',
            'x-project-id': 'project_id'
        },
        data: {
            recipient: 'email:replaceme@youruser.com:solana',
            reuploadLinkedFiles: true,
            metadata: {
            name: 'My first Mint API NFT',
            image: 'https://www.crossmint.com/assets/crossmint/logo.png',
            description: 'My NFT created via the mint API!',
            animation_url: 'string',
            attributes: [{display_type: 'boost_number', trait_type: 'string', value: 'string'}]
            }
        }
    };
    
    axios(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
}

const listNFT = async(id) => {
    const options = {
        method: 'GET',
        url: `https://staging.crossmint.com/api/2022-06-09/collections/${config.CROSSMINT_COLLECTION_ID}/nfts/${id}`,
        headers: {
            accept: 'application/json',
            'x-client-secret': `${config.CROSSMINT_SECRET_KEY}`,
            'x-project-id': `${config.CROSSMINT_PROJECT_ID}`
        }
    };
    
    return await axios(options)
    .then(function (response) {
        return {success: true, message: response?.data}
    })
    .catch(function (error) {
        console.error(error);
        return {success: false, message:error}
    });
}

const checkPaymentNFT = async () =>{
    try{
        const nfts = await Payment.find({ nft_status: "pending" }).catch((err)=> { console.log(err);return []})
        nfts&&nfts.length > 0 && nfts.map(async(item, index)=>{
            if(item?.action_id){
                console.log("action_id: ", item.action_id)
                const res = await listNFT(item?.action_id)
                if(res?.success){
                    const payment = await Payment.findOne({action_id: item?.action_id})
                    payment.nft_status = "success";
                    payment.metadata = res?.message;
                    payment.save();
                }
            }else{  
                console.log("minting: ", item.product_id)
                const product_id = item.product_id;
                const user_id = item.user_id;
                const user = await User.findOne({_id: user_id});
                const product = await Product.findOne({product_id: product_id});
                const data = await mint("", user?.publicKey, `${config.backend}/${product.product_file}`);
                if(data.success){ 
                    const payment = await Payment.findOne({user_id: user_id, product_id: product_id})
                    payment.action_id = data?.message?.actionId;  // crossmint actionId
                    payment.save();
                }
            }
        }) 
    }catch(error){
        console.log(error)
    }
    
}

module.exports = { mint, mintCompressedNFT, mintIdempotent, mintIdempotentCompressed, listNFT, checkPaymentNFT }