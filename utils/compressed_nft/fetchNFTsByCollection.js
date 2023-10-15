/**
 * Demonstrate the use of a few of the Metaplex Read API methods,
 * (needed to fetch compressed NFTs)
 */

// local import of the connection wrapper, to help with using the ReadApi
const { WrapperConnection } = require("./WrapperConnection");

// import custom helpers for demos
const { loadPublicKeysFromFile, printConsoleSeparator } = require("./helpers");

// imports from other libraries
const { PublicKey, clusterApiUrl } = require("@solana/web3.js");

const config = require('./../../config');


const fetchNFTsByCollection = async () => {
  // load the stored PublicKeys for ease of use
  let keys = loadPublicKeysFromFile();

  // ensure the primary script was already run
  if (!keys?.collectionMint)
    return console.warn("No local keys were found, specifically `collectionMint`");

  // convert the locally saved keys to PublicKeys
  const collectionMint = keys.collectionMint;

  console.log("==== Local PublicKeys loaded ====");
  console.log("Collection mint:", collectionMint.toBase58());

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // load the env variables and store the cluster RPC url
  const CLUSTER_URL = config.RPC_URL ?? clusterApiUrl("devnet");

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(CLUSTER_URL);

  printConsoleSeparator("Getting all assets by the 'collection' group...");

  await connection
    .getAssetsByGroup({
      groupKey: "collection",
      groupValue: collectionMint.toBase58(),
      sortBy: {
        sortBy: "recent_action",
        sortDirection: "asc",
      },
    })
    .then(res => {
      console.log("Total assets returned:", res.total);

      // loop over each of the asset items in the collection
      res.items?.map(asset => {
        // display a spacer between each of the assets
        console.log("\n===============================================");

        // print the entire asset record to the console
        // console.log(asset);

        // print some useful info
        console.log("assetId:", asset.id);
        console.log("ownership:", asset.ownership);
        console.log("compression:", asset.compression);
      });
    });
};

module.exports = { fetchNFTsByCollection}
