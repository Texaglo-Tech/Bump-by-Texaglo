import "../styles/globals.css";
import "regenerator-runtime/runtime";
import axios from "axios";

// axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
