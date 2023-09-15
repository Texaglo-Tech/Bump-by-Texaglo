import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Partners.module.css";
import images from "../../assets";

const Partners = () => {
  return (
    <>
      <div className={Style.Partners_Section}>
        <h1>partners</h1>
        <div className={Style.Partners_images}>
          <Image
            className={Style.Partners_single_image}
            src={images.gitcoin}
            alt="image"
          />
          <Image
            className={Style.Partners_single_image}
            src={images.parcel}
            alt="image"
          />
          <Image
            className={Style.Partners_single_image}
            src={images.push}
            alt="image"
          />
          <Image
            className={Style.Partners_single_image}
            src={images.hedera}
            alt="image"
          />
          <Image
            className={Style.Partners_single_image}
            src={images.infura}
            alt="image"
          />
        </div>
        <div className={Style.Partners_button}>
          <Image
            className={Style.Partners_button_img}
            src={images.hands}
            alt="image"
          />
          <h3>Become a Partner</h3>
        </div>
      </div>
    </>
  );
};

export default Partners;
