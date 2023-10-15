/*
  This script demonstrates how to mint an additional compressed NFT to an existing tree and/or collection
  ---
  NOTE: A collection can use multiple trees to store compressed NFTs, as desired. 
  This example uses the same tree for simplicity.
*/

const { PublicKey, clusterApiUrl } = require("@solana/web3.js");
const {
  MetadataArgs,
  TokenProgramVersion,
  TokenStandard,
} = require("@metaplex-foundation/mpl-bubblegum");

// import custom helpers to mint compressed NFTs
const { WrapperConnection } = require("./WrapperConnection");
const { mintCompressedNFT } = require("./compression");
const {
  loadKeypairFromFile,
  loadOrGenerateKeypair,
  loadPublicKeysFromFile,
  printConsoleSeparator,
} = require("./helpers");

// load the env variables and store the cluster RPC url
const config = require('./../../config');

const mintToCollection = async () => {
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // generate a new Keypair for testing, named `wallet`
  const testWallet = loadOrGenerateKeypair("testWallet");

  // generate a new keypair for use in this demo (or load it locally from the filesystem when available)
  const payer = config.LOCAL_PAYER_JSON_ABSPATH
    ? loadKeypairFromFile(config.LOCAL_PAYER_JSON_ABSPATH)
    : loadOrGenerateKeypair("payer");

  console.log("Payer address:", payer.publicKey.toBase58());
  console.log("Test wallet address:", testWallet.publicKey.toBase58());

  // load the stored PublicKeys for ease of use
  let keys = loadPublicKeysFromFile();

  // ensure the primary script was already run
  if (!keys?.collectionMint || !keys?.treeAddress)
    return console.warn("No local keys were found. Please run the `index` script");

  const treeAddress = keys.treeAddress;
  const treeAuthority = keys.treeAuthority;
  const collectionMint = keys.collectionMint;
  const collectionMetadataAccount = keys.collectionMetadataAccount;
  const collectionMasterEditionAccount = keys.collectionMasterEditionAccount;

  console.log("==== Local PublicKeys loaded ====");
  console.log("Tree address:", treeAddress.toBase58());
  console.log("Tree authority:", treeAuthority.toBase58());
  console.log("Collection mint:", collectionMint.toBase58());
  console.log("Collection metadata:", collectionMetadataAccount.toBase58());
  console.log("Collection master edition:", collectionMasterEditionAccount.toBase58());

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  // load the env variables and store the cluster RPC url
  const CLUSTER_URL = config.RPC_URL ?? clusterApiUrl("devnet");

  // create a new rpc connection, using the ReadApi wrapper
  const connection = new WrapperConnection(CLUSTER_URL);

  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  printConsoleSeparator();

  /*
    Mint a single compressed NFT
  */

  const compressedNFTMetadata = {
    name: "Texaglo",
    symbol: "Texaglo",
    // specific json metadata for each NFT
    uri: "https://supersweetcollection.notarealurl/token.json",
    sellerFeeBasisPoints: 100,
    creators: [
      {
        address: payer.publicKey,
        verified: false,
        share: 99,
        // share: 100,
      },
      {
        address: testWallet.publicKey,
        verified: false,
        share: 1,
        // share: 0,
      },
    ],
    editionNonce: 0,
    uses: null,
    collection: null,
    primarySaleHappened: false,
    isMutable: true,
    // values taken from the Bubblegum package
    tokenProgramVersion: TokenProgramVersion.Original,
    tokenStandard: TokenStandard.NonFungible,
  };

  // fully mint a single compressed NFT to the payer
  console.log(`Minting a single compressed NFT to ${payer.publicKey.toBase58()}...`);

  const mintToPayer = await mintCompressedNFT(
    connection,
    payer,
    treeAddress,
    collectionMint,
    collectionMetadataAccount,
    collectionMasterEditionAccount,
    compressedNFTMetadata,
    // mint to this specific wallet (in this case, the tree owner aka `payer`)
    payer.publicKey,
  );

  // fully mint a single compressed NFT
  console.log(`Minting a single compressed NFT to ${testWallet.publicKey.toBase58()}...`);

  const mintToWallet = await mintCompressedNFT(
    connection,
    payer,
    treeAddress,
    collectionMint,
    collectionMetadataAccount,
    collectionMasterEditionAccount,
    compressedNFTMetadata,
    // mint to this specific wallet (in this case, airdrop to `testWallet`)
    testWallet.publicKey,
  );
};

module.exports = { mintToCollection }
