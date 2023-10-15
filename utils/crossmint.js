const config = require("./../config");
const axios = require("axios")

const mint = () => {
    const options = {
    method: 'POST',
    url: 'https://staging.crossmint.com/api/2022-06-09/collections/default/nfts',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-client-secret': 'sk_test.PwsXFMPs.nvhuzsIcD336ttG5H28EwW1JsI9YeU2n',
        'x-project-id': '63f96aa64cf0e3284b16eef9'
    },
    data: {
        recipient: 'email:replaceme@youruser.com:solana',
        compressed: true,
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

const mintCompressedNFT = ()=>{
    const options = {
    method: 'POST',
    url: 'https://staging.crossmint.com/api/v1-alpha1/minting/collections/default-solana/nfts',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-client-secret': 'sk_test.PwsXFMPs.nvhuzsIcD336ttG5H28EwW1JsI9YeU2n',
        'x-project-id': '63f96aa64cf0e3284b16eef9'
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
        'x-client-secret': 'sk_test.PwsXFMPs.nvhuzsIcD336ttG5H28EwW1JsI9YeU2n',
        'x-project-id': '63f96aa64cf0e3284b16eef9'
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
            'x-client-secret': 'sk_test.PwsXFMPs.nvhuzsIcD336ttG5H28EwW1JsI9YeU2n',
            'x-project-id': '63f96aa64cf0e3284b16eef9'
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

const listNFT = () => {
    const options = {
        method: 'GET',
        url: 'https://staging.crossmint.com/api/2022-06-09/collections/collectionId/nfts',
        headers: {
            'x-client-secret': 'sk_test.PwsXFMPs.nvhuzsIcD336ttG5H28EwW1JsI9YeU2n',
            'x-project-id': '63f96aa64cf0e3284b16eef9'
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

module.exports = { mint, mintCompressedNFT, mintIdempotent, mintIdempotentCompressed, listNFT }