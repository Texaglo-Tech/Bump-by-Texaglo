import SideBar from "../Components/SideBar/SideBar";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuthentication, setAuthToken } from "../api";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  
  useEffect(()=>{
    checkAuthentication(router)
  }, [])
  
  return (
    <>
      <ToastContainer />
      <SideBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
