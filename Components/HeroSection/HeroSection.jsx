import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import images from "../../assets";

const HeroSection = () => {
  return (
    <>
      <div className={Style.hero_section}>
        <div className={Style.hero_content}>
          <h1>BUIDL WEB3 __ WITH FRENS</h1>
          <p>
            Developer DAO is a community of thousands of web3 builders creating
            a better internet. Join us and help create the future!
          </p>
        </div>
        <div className={Style.hero_buttons}>
          <div className={Style.hero_button_one}>Claim $CODE</div>
          <div className={Style.hero_button_two}>
            <Image
              className={Style.button_icon}
              src={images.discord}
              alt="image"
            />
            <div className={Style.hero_button_two_content}>
              <p>
                Join Discord <br /> <span>(via Guild.xyz)</span>{" "}
              </p>
            </div>
          </div>
        </div>
        <Image
          className={Style.scrool_down}
          src={images.scrool_down}
          alt="image"
        />
      </div>
    </>
  );
};

export default HeroSection;
