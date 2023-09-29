import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../assets";

const SideBar = () => {
  return (
    <>
      <div className={Style.Nav}>
        <a href="/login"><Image className={Style.NavPic} src={images.navpic} alt="image" /></a>
        <div className={Style.NavIcons}>
          <div className={Style.IconTop}>
            <hr />
            <a href="/dashboard"><Image
              className={Style.NavIconImg}
              src={images.rocket}
              alt="image"
            /></a>
            <Image className={Style.NavIconImg} src={images.book} alt="image" />
            <Image className={Style.NavIconImg} src={images.tool} alt="image" />
            <Image
              className={Style.NavIconImg}
              src={images.sparkles}
              alt="image"
            />
            <Image
              className={Style.NavIconImg}
              src={images.diamond}
              alt="image"
            />
          </div>
          <div className={Style.IconBottom}>
            <hr />
            <Image
              className={Style.NavIconImg}
              src={images.twitter}
              alt="image"
            />
            <Image
              className={Style.NavIconImg}
              src={images.youtube}
              alt="image"
            />
            <Image
              className={Style.NavIconImg}
              src={images.github}
              alt="image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
