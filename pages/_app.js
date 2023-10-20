import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuthentication, setAuthToken } from "../api";
import { useRouter } from "next/router";
import { ConnectionProvider, useConnection, useWallet, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import React, { useMemo, useState, useEffect } from 'react';
import { PhantomWalletAdapter, SolflareWalletAdapter, UnsafeBurnerWalletAdapter, TorusWalletAdapter} from '@solana/wallet-adapter-wallets';
import { GlobalProviders } from "../context/GlobalContext";
import Payment from "../Components/Payment/Payment";
const config = require("./../config.json")

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  const [endpoint, setEndpoint] = useState(config.mainnetRPC);

  useEffect(()=>{
    checkAuthentication(router)
  }, [])
  
  const wallets = useMemo(
    () => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new TorusWalletAdapter(),
    ],
    [endpoint]
  ); 

  return (
    <>
        <ConnectionProvider endpoint={endpoint}>
          <GlobalProviders>
            <WalletProvider wallets={wallets}>
              <WalletModalProvider>
                <ToastContainer />
                <Payment/>
                <Component {...pageProps} />
              </WalletModalProvider>
            </WalletProvider>
          </GlobalProviders>
        </ConnectionProvider>
    </>
  );
}

export default MyApp;
