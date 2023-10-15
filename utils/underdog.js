
const config = require("./../config");
const axios = require("axios")

const createProjectWithUnderdog = async (network) => {
    const body = JSON.stringify({
      "name": "Texaglo",
      "image": "https://dev.updg8.com/imgdata/A9BCAo4yf777EQuq1TJedWie3ts6yqhmyGHECGKgpWUs",
      "transferable": false
    });

    const req = {
      method: 'post',
      url: `${network == "devnet" ? "https://dev.underdogprotocol.com/v2/projects" :"https://api.underdogprotocol.com/v2/projects"}`,
      headers: {
        'Authorization': `Bearer ${config.UNDERDOG_KEY}`, 
        'Content-Type': 'application/json'
      },
      data : body
    };

    return await axios(req)
    .then((response) => {
      const projectId = response.data.projectId 
	  return {success: true, projectId}
	}).catch((err)=>{console.log(err); return { success: false, message: err}})
}

const createNFTWithUnderdog = async (network, uri = "https://dev.updg8.com/imgdata/A9BCAo4yf777EQuq1TJedWie3ts6yqhmyGHECGKgpWUs", wallet, project = 1) => {
	let body = JSON.stringify({
	  "name": "Texaglo",
	  "image": `${uri}`,
	  "description": "Texaglo",
	  "receiverAddress": wallet,
	  "upsert": false
	});
	
	let req = {
	  method: 'post',
	  url: network == 'devnet' ? `https://dev.underdogprotocol.com/v2/projects/${project}/nfts`:`https://api.underdogprotocol.com/v2/projects/${project}/nfts`,
	  headers: { 
		'Authorization': `Bearer ${config.UNDERDOG_KEY}`, 
		'Content-Type': 'application/json'
	  },
	  data : body
	};
	
	return await axios(req).then((data)=>{return {success: true, message: data.data}}).catch((error) => { console.log(error); return { success: false, message: error } });
}

module.exports = { createProjectWithUnderdog, createNFTWithUnderdog }