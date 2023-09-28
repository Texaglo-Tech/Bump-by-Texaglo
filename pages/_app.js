import SideBar from "../Components/SideBar/SideBar";
import "../styles/globals.css";
import axios from "axios";

// axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SideBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
