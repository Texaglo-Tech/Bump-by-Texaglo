import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NavProfile.module.css";
import images from "../../assets";

const NavProfile = () => {
  return (
    <>
      <div className={Style.profile_section}>
        <div className={Style.profile_address_section}></div>
        <div className={Style.profile_img_section}>
          <Image
            className={Style.profile_img}
            src={images.profile_icon}
            alt="image"
          />
        </div>
      </div>
    </>
  );
};

export default NavProfile;
