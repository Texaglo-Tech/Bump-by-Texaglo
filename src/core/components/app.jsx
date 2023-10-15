import React, { useMemo } from "react"
import PropTypes from "prop-types"

import { ToastContainer } from "react-toastify";

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter, GlowWalletAdapter, TorusWalletAdapter} from '@solana/wallet-adapter-wallets';
import {ConnectionProvider, useConnection, useWallet, WalletProvider} from '@solana/wallet-adapter-react';

require('@solana/wallet-adapter-react-ui/styles.css');
require("react-toastify/dist/ReactToastify.css");

export default class App extends React.Component {


  getLayout() {
    let { getComponent, layoutSelectors } = this.props
    const layoutName = layoutSelectors.current()
    const Component = getComponent(layoutName, true)
    return Component ? Component : ()=> <h1> No layout defined for &quot;{layoutName}&quot; </h1>
  }

  
  render() {
    const Layout = this.getLayout()    

    // const endpoint = "https://api.devnet.solana.com"

    const wallets = [
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
          new TorusWalletAdapter(),
      ]

    return (
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ToastContainer />
          <Layout/>
        </WalletModalProvider>
      </WalletProvider>
    )
  }
}

App.propTypes = {
  getComponent: PropTypes.func.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
}

App.defaultProps = {
}
