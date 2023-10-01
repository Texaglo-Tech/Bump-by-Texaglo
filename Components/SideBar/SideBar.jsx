import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from 'next/link';    

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../assets";
import { useGlobal } from "../../context/GlobalContext";
import { useRouter } from "next/router";

const SideBar = () => {
  const { activeSubMenuHandle, activeNavbarHandle } = useGlobal();
  const router = useRouter()
  return (
    <>
      <div className={Style.Nav}>
        <Image className={Style.NavPic} src={images.navpic} alt="image" onClick={activeSubMenuHandle}/>
        <div className={Style.NavIcons}>
          <div className={Style.IconTop}>
            <hr />
            <Image
              className={Style.NavIconImg}
              src={images.rocket}
              alt="image"
              onClick={()=> {activeNavbarHandle(0)}}
            />
            <Image className={Style.NavIconImg} src={images.book} alt="image" onClick={()=> {activeNavbarHandle(1)}} />
            <Image className={Style.NavIconImg} src={images.tool} alt="image" onClick={()=> {activeNavbarHandle(2)}} />
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
