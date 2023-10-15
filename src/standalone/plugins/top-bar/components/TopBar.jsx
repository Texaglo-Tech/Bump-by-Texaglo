import React, { cloneElement, useEffect, useState } from "react"
import PropTypes from "prop-types"

import {parseSearch, serializeSearch} from "core/utils"
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
} from "@solana/web3.js";


import {
  Metaplex,
  keypairIdentity,
  walletAdapterIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber,
  findMetadataPda,
  findMasterEditionV2Pda,
  findCollectionAuthorityRecordPda,
  amount,
} from "@metaplex-foundation/js";

import {ConnectionProvider, useConnection, useWallet, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import { toast } from "react-toastify";
toast.configure();

const TopBar = (props) =>{

  // static propTypes = {
  //   layoutActions: PropTypes.object.isRequired,
  //   authActions: PropTypes.object.isRequired
  // }
  const wallet = useWallet();
  // const [url, setUrl] = useState("")
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // useEffect(()=>{
  //   setUrl(props.specSelectors.url())    
  //   setSelectedIndex(0)
  // }, [])

  const getAllNFTsNew = async (network) => {
    try {
      console.log("Get ALL NFT FROM WALLET");
      const endpoint = "https://api.devnet.solana.com"
      const techNFT = [];
      let connection;
      if(network == "devnet") {
        connection = new Connection(endpoint);
      }else{
        connection = new Connection(endpoint);
      }
      console.log("network: ", network)
      const metaplex = new Metaplex(connection);
      const owner = new PublicKey(wallet?.publicKey);
      const allNFTs = await metaplex.nfts().findAllByOwner({ owner: owner });
      console.log(allNFTs);
      for (let i = 0; i < allNFTs.length; i++) {
        if (
          allNFTs[i].symbol == "TECH"
        ) {
          techNFT.push(allNFTs[i]);
        }
      }
      if(techNFT.length>0) {
        toast.success("You can use api key", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        localStorage.setItem("status", true);
      }else{
        toast.info("You need to buy the texaglo NFT", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      }
      return techNFT;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // const onUrlChange = (e)=> {
  //   let {target: {value}} = e
  //   this.setState({url: value})
  // }

  // const flushAuthData = () =>{
  //   const { persistAuthorization } = this.props.getConfigs()
  //   if (persistAuthorization)
  //   {
  //     return
  //   }
  //   this.props.authActions.restoreAuthorization({
  //     authorized: {}
  //   })
  // }

  // const loadSpec = (url) => {
  //   this.flushAuthData()
  //   this.props.specActions.updateUrl(url)
  //   this.props.specActions.download(url)
  // }

  // const onUrlSelect =(e)=> {
  //   let url = e.target.value || e.target.href
  //   this.loadSpec(url)
  //   this.setSelectedUrl(url)
  //   e.preventDefault()
  // }

  // const downloadUrl = (e) => {
  //   this.loadSpec(this.state.url)
  //   e.preventDefault()
  // }

  // const setSearch = (spec) => {
  //   let search = parseSearch()
  //   search["urls.primaryName"] = spec.name
  //   const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
  //   if(window && window.history && window.history.pushState) {
  //     window.history.replaceState(null, "", `${newUrl}?${serializeSearch(search)}`)
  //   }
  // }

  // const setSelectedUrl = (selectedUrl) => {
  //   const configs = this.props.getConfigs()
  //   const urls = configs.urls || []

  //   if(urls && urls.length) {
  //     if(selectedUrl)
  //     {
  //       urls.forEach((spec, i) => {
  //         if(spec.url === selectedUrl)
  //           {
  //             this.setState({selectedIndex: i})
  //             this.setSearch(spec)
  //           }
  //       })
  //     }
  //   }
  // }

  // useEffect(() => {


  //   const configs = this.props.getConfigs()
  //   const urls = configs.urls || []

  //   if(urls && urls.length) {
  //     var targetIndex = this.state.selectedIndex
  //     let search = parseSearch()
  //     let primaryName = search["urls.primaryName"] || configs["urls.primaryName"]
  //     if(primaryName)
  //     {
  //       urls.forEach((spec, i) => {
  //         if(spec.name === primaryName)
  //           {
  //             this.setState({selectedIndex: i})
  //             targetIndex = i
  //           }
  //       })
  //     }
      

  //     this.loadSpec(urls[targetIndex].url)
  //   }
  // }, [])

  // const onFilterChange =(e) => {
  //   let {target: {value}} = e
  //   this.props.layoutActions.updateFilter(value)
  // }

  // let { getComponent, specSelectors, getConfigs } = this.props

  // const Button = getComponent("Button")
  // const Link = getComponent("Link")
  // const Logo = getComponent("Logo")

  // let isLoading = specSelectors.loadingStatus() === "loading"
  // let isFailed = specSelectors.loadingStatus() === "failed"

  // const classNames = ["download-url-input"]
  // if (isFailed) classNames.push("failed")
  // if (isLoading) classNames.push("loading")

  // const { urls } = getConfigs()
  // let control = []
  // let formOnSubmit = null

  // if(urls) {
  //   let rows = []
  //   urls.forEach((link, i) => {
  //     rows.push(<option key={i} value={link.url}>{link.name}</option>)
  //   })

  //   control.push(
  //     <label className="select-label" htmlFor="select"><span>Select a definition</span>
  //       <select id="select" disabled={isLoading} onChange={ this.onUrlSelect } value={urls[this.state.selectedIndex].url}>
  //         {rows}
  //       </select>
  //     </label>
  //   )
  // }
  // else {
  //   formOnSubmit = this.downloadUrl
  //   control.push(<input className={classNames.join(" ")} type="text" onChange={ this.onUrlChange } value={this.state.url} disabled={isLoading} />)
  //   control.push(<Button className="download-url-button" onClick={ this.downloadUrl }>Explore</Button>)
  // }


  useEffect(() => {
    if (wallet?.publicKey) {
        getAllNFTsNew("devnet");
    }
    // wallet?.select("Phantom")
    // console.log(wallet.publicKey)
  }, [wallet?.publicKey]);

  return (
    <div style={{justifyContent:"flex-end",display: "flex"}}>
      <WalletMultiButton id="walletConnect" startIcon=""  endIcon="" className={"wallet_button_bg"} >
      </WalletMultiButton>
    </div>
    // <div className="topbar">
    //   <div className="wrapper">
    //     <div className="topbar-wrapper">
    //       <Link>
    //         <Logo/>
    //       </Link>
    //       <form className="download-url-wrapper" onSubmit={formOnSubmit}>
    //         {control.map((el, i) => cloneElement(el, { key: i }))}
    //       </form>
    //     </div>
    //   </div>
    // </div>
  )
}

TopBar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired
}

export default TopBar
