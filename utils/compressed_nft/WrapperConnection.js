const { Commitment, Connection, ConnectionConfig, PublicKey } = require("@solana/web3.js");
const BN = require("bn.js");

const { TokenStandard } = require("@metaplex-foundation/mpl-token-metadata");
const { PROGRAM_ID } = require("@metaplex-foundation/mpl-bubblegum");

// import from the `@metaplex-foundation/js`
const { MetaplexError, toBigNumber, Pda, amount } = require("@metaplex-foundation/js");


/** @group Errors */
class ReadApiError extends MetaplexError {
  name = "ReadApiError";
  constructor(message, cause) {
    super(message, "rpc", undefined, cause);
  }
}

/**
 * Convert a ReadApi asset (e.g. compressed NFT) into an NftEdition
 */
const toNftEditionFromReadApiAsset = (input) => {
  return {
    model: "nftEdition",
    isOriginal: true,
    address: new PublicKey(input.id),
    supply: toBigNumber(input.supply.print_current_supply),
    maxSupply: toBigNumber(input.supply.print_max_supply),
  };
};

/**
 * Convert a ReadApi asset (e.g. compressed NFT) into an NFT mint
 */
const toMintFromReadApiAsset = (input) => {
  const currency = {
    symbol: "Token",
    decimals: 0,
    namespace: "spl-token",
  };

  return {
    model: "mint",
    address: new PublicKey(input.id),
    mintAuthorityAddress: new PublicKey(input.id),
    freezeAuthorityAddress: new PublicKey(input.id),
    decimals: 0,
    supply: amount(1, currency),
    isWrappedSol: false,
    currency,
  };
};

/**
 * Convert a ReadApi asset's data into standard Metaplex `Metadata`
 */
const toMetadataFromReadApiAsset = (input) => {
  const updateAuthority = input.authorities?.find(authority => authority.scopes.includes("full"));

  const collection = input.grouping.find(({ group_key }) => group_key === "collection");

  return {
    model: "metadata",
    /**
     * We technically don't have a metadata address anymore.
     * So we are using the asset's id as the address
     */
    address: Pda.find(BUBBLEGUM_PROGRAM_ID, [
      Buffer.from("asset", "utf-8"),
      new PublicKey(input.compression.tree).toBuffer(),
      Uint8Array.from(new BN(input.compression.leaf_id).toArray("le", 8)),
    ]),
    mintAddress: new PublicKey(input.id),
    updateAuthorityAddress: new PublicKey(updateAuthority.address),

    name: input.content.metadata?.name ?? "",
    symbol: input.content.metadata?.symbol ?? "",

    json: input.content.metadata,
    jsonLoaded: true,
    uri: input.content.json_uri,
    isMutable: input.mutable,

    primarySaleHappened: input.royalty.primary_sale_happened,
    sellerFeeBasisPoints: input.royalty.basis_points,
    creators: input.creators,

    editionNonce: input.supply.edition_nonce,
    tokenStandard: TokenStandard.NonFungible,

    collection: collection
      ? { address: new PublicKey(collection.group_value), verified: false }
      : null,

    // Current regular `Metadata` does not currently have a `compression` value
    // @ts-ignore
    compression: input.compression,

    // Read API doesn't return this info, yet
    collectionDetails: null,
    // Read API doesn't return this info, yet
    uses: null,
    // Read API doesn't return this info, yet
    programmableConfig: null,
  };
};

/**
 * Wrapper class to add additional methods on top the standard Connection from `@solana/web3.js`
 * Specifically, adding the RPC methods used by the Digital Asset Standards (DAS) ReadApi
 * for state compression and compressed NFTs
 */
class WrapperConnection extends Connection {
  constructor(endpoint, commitmentOrConfig) {
    super(endpoint, commitmentOrConfig);
  }

  callReadApi = async(
    jsonRpcParams,
  ) => {
    const response = await fetch(this.rpcEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: jsonRpcParams.method,
        id: jsonRpcParams.id ?? "rpd-op-123",
        params: jsonRpcParams.params,
      }),
    });

    return await response.json();
  };

  // Asset id can be calculated via Bubblegum#getLeafAssetId
  // It is a PDA with the following seeds: ["asset", tree, leafIndex]
  async getAsset(assetId){
    const { result: asset } = await this.callReadApi({
      method: "getAsset",
      params: {
        id: assetId.toBase58(),
      },
    });

    if (!asset) throw new ReadApiError("No asset returned");

    return asset;
  }

  // Asset id can be calculated via Bubblegum#getLeafAssetId
  // It is a PDA with the following seeds: ["asset", tree, leafIndex]
  async getAssetProof(assetId){
    const { result: proof } = await this.callReadApi({
      method: "getAssetProof",
      params: {
        id: assetId.toBase58(),
      },
    });

    if (!proof) throw new ReadApiError("No asset proof returned");

    return proof;
  }

  //
  async getAssetsByGroup({
    groupKey,
    groupValue,
    page,
    limit,
    sortBy,
    before,
    after,
  }) {
    // `page` cannot be supplied with `before` or `after`
    if (typeof page == "number" && (before || after))
      throw new ReadApiError(
        "Pagination Error. Only one pagination parameter supported per query.",
      );

    // a pagination method MUST be selected, but we are defaulting to using `page=0`

    const { result } = await this.callReadApi({
      method: "getAssetsByGroup",
      params: {
        groupKey,
        groupValue,
        after: after ?? null,
        before: before ?? null,
        limit: limit ?? null,
        page: page ?? 1,
        sortBy: sortBy ?? null,
      },
    });

    if (!result) throw new ReadApiError("No results returned");

    return result;
  }

  //
  async getAssetsByOwner({
    ownerAddress,
    page,
    limit,
    sortBy,
    before,
    after,
  }) {
    // `page` cannot be supplied with `before` or `after`
    if (typeof page == "number" && (before || after))
      throw new ReadApiError(
        "Pagination Error. Only one pagination parameter supported per query.",
      );

    // a pagination method MUST be selected, but we are defaulting to using `page=0`

    const { result } = await this.callReadApi({
      method: "getAssetsByOwner",
      params: {
        ownerAddress,
        after: after ?? null,
        before: before ?? null,
        limit: limit ?? null,
        page: page ?? 1,
        sortBy: sortBy ?? null,
      },
    });

    if (!result) throw new ReadApiError("No results returned");

    return result;
  }
}

module.exports = {
  toNftEditionFromReadApiAsset, toMintFromReadApiAsset, toMetadataFromReadApiAsset, WrapperConnection, ReadApiError
}
