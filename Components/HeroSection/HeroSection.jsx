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
          <h1>Bump Sub Dao</h1>
          <br/>
          <br/>
          <p>
          Bump is a proposed Sub Dao of Developer Dao formed by members  who are web3 Commerce builders. Join Developer Dao to Create the future and Help with bump
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
