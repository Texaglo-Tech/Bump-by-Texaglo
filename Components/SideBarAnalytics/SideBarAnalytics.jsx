import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./SideBarAnalytics.module.css";
import images from "../../assets";
import { useGlobal } from "../../context/GlobalContext";

const SideBarAnalytics = ({ setIndex }) => {
  const {activeSubMenu, activeSubMenuHandle, activeNavbar} = useGlobal();

  return (
    <>
      <div className={Style.Nav_analytics} style={{ display: activeSubMenu? "block": "none" }}>
        <div className={Style.Nav_analytics_cancel_btn} onClick={()=>activeSubMenuHandle()}>
          <Image
            className={Style.left_double_arrow}
            src={images.left_double_arrow}
            alt="image"
          />
          <p>Cancel</p>
        </div>
        <div className={Style.Nav_analytics_title}>
          {activeNavbar == 0? <h1 className="navbar_title" style={{ display: "flex",justifyContent: "center"}}>Post</h1>:null}
          {activeNavbar == 1? <h1 className="navbar_title" style={{ display: "flex",justifyContent: "center"}}>Analytics</h1>:null}
          {activeNavbar == 2? <h1 className="navbar_title" style={{ display: "flex",justifyContent: "center"}}>Design</h1>:null}
        </div>
        <div className={Style.Nav_analytics_btn_list}>
          {
            activeNavbar == 0? <>
              <div
                className={Style.Nav_analytics_btn_single}
                onClick={() => setIndex(1)}
              >
                Post
              </div>
              </>: null
          }
          {
            activeNavbar == 1? <>
                <div
                  className={Style.Nav_analytics_btn_single}
                  onClick={() => setIndex(2)}
                >
                  Product
                </div>
                <div
                  className={Style.Nav_analytics_btn_single}
                  onClick={() => setIndex(3)}
                >
                  Data
                </div>
              </>
              :null
          }
          {
            activeNavbar == 2? <>
              <div
                className={Style.Nav_analytics_btn_single}
                onClick={() => setIndex(4)}
              >
                Customize
              </div>
              <div
                className={Style.Nav_analytics_btn_single}
                onClick={() => setIndex(5)}
              >
                survey
              </div>
              <div
                className={Style.Nav_analytics_btn_single}
                onClick={() => setIndex(6)}
              >
                Add Ai
              </div>
            </>:null
          }
        </div>
      </div>
    </>
  );
};

export default SideBarAnalytics;
