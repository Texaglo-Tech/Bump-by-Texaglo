import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../assets";

const HeroSection = () => {
  return (
    <>
      <div className={Style.HeroSection}>
        <div className={Style.HeroContent}>
          <h1>Voice Recognition Ai Bot</h1>
          {/* <p>
            Developer DAO is a community of thousands of web3 builders creating
            a better internet. Join us and help create the future!
          </p> */}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
