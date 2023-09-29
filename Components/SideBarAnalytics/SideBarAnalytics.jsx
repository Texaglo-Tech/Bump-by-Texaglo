import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./SideBarAnalytics.module.css";
import images from "../../assets";

const SideBarAnalytics = ({ setIndex }) => {
  return (
    <>
      <div className={Style.Nav_analytics}>
        <div className={Style.Nav_analytics_cancel_btn}>
          <Image
            className={Style.left_double_arrow}
            src={images.left_double_arrow}
            alt="image"
          />
          <p>Cancel</p>
        </div>
        <div className={Style.Nav_analytics_title}>
          <h1>Analytics</h1>
          <p>Real time</p>
        </div>
        <div className={Style.Nav_analytics_btn_list}>
          <div
            className={Style.Nav_analytics_btn_single}
            onClick={() => setIndex(1)}
          >
            Post
          </div>
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
        </div>
      </div>
    </>
  );
};

export default SideBarAnalytics;
