import SideBar from "../Components/SideBar/SideBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SideBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
