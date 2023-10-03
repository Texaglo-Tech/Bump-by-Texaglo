import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../assets";
import { useGlobal } from "../../context/GlobalContext";
import { useRouter } from "next/router";
import { Grid, Hidden } from '@mui/material';

const SideBar = () => {
  const { activeSubMenuHandle, activeNavbarHandle, downSubMenuHandle } = useGlobal();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Hidden mdDown>
        <div className={Style.nav}>
          <Image
            className={Style.nav_pic}
            src={images.navpic}
            alt="image"
            onClick={activeSubMenuHandle}
          />
          <div className={Style.nav_ions}>
            <div className={Style.IconTop}>
              <hr />
              <Image
                className={Style.nav_icon_img}
                src={images.rocket}
                alt="image"
                onClick={() => {
                  activeNavbarHandle(0);
                }}
              />
              <Image
                className={Style.nav_icon_img}
                src={images.book}
                alt="image"
                onClick={() => {
                  activeNavbarHandle(1);
                }}
              />
              <Image
                className={Style.nav_icon_img}
                src={images.tool}
                alt="image"
                onClick={() => {
                  activeNavbarHandle(2);
                }}
              />
            </div>

            <div className={Style.icon_bottom}>
              <Image
                className={Style.nav_icon_img}
                src={images.discord}
                alt="image"
              />
              <hr />
              <Image
                className={Style.nav_icon_img}
                src={images.twitter}
                alt="image"
              />
              <Image
                className={Style.nav_icon_img}
                src={images.youtube}
                alt="image"
              />
              <Image
                className={Style.nav_icon_img}
                src={images.github}
                alt="image"
              />
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden mdUp>
        <div className={Style.nav_responsive}>
          <Image
              className={Style.nav_responsive_pic}
              src={images.down}
              alt="image"              
              onClick={()=>{downSubMenuHandle(); setVisible(!visible)}}
          />
        </div>
        {visible?
        <div className={Style.nav}>
          <Image
            className={Style.nav_pic}
            src={images.navpic}
            alt="image"
            onClick={activeSubMenuHandle}
          />
          <div className={Style.nav_icons}>
            <div className={Style.icon_top}>
              <hr />
              <Image
                className={Style.nav_icon_img}
                src={images.rocket}
                alt="image"
                onClick={() => {
                  activeNavbarHandle(0);
                }}
              />
              <Image
                className={Style.nav_icon_img}
                src={images.book}
                alt="image"
                onClick={() => {
                  activeNavbarHandle(1);
                }}
              />
              <Image
                className={Style.nav_icon_img}
                src={images.tool}
                alt="image"
                onClick={() => {
                  activeNavbarHandle(2);
                }}
              />
            </div>

            <div className={Style.icon_bottom}>
              <Image
                className={Style.nav_icon_img}
                src={images.discord}
                alt="image"
              />
              <hr />
              <Image
                className={Style.nav_icon_img}
                src={images.twitter}
                alt="image"
              />
              <Image
                className={Style.nav_icon_img}
                src={images.youtube}
                alt="image"
              />
              <Image
                className={Style.nav_icon_img}
                src={images.github}
                alt="image"
              />
            </div>
          </div>
        </div>
        : null}
      </Hidden>      
    </>
  );
};

export default SideBar;
