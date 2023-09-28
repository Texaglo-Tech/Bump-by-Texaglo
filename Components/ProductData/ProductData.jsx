import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./ProductData.module.css";
import images from "../../assets";

const ProductData = () => {
  return (
    <>
      <div className={Style.Product_section}>
        <div className={Style.Product_post_section}>
          <h1>Bump-me Product Data</h1>
          <div className={Style.Product_data_box}>
            <div className={Style.Product_data_single}></div>
            <div className={Style.Product_data_single}></div>
          </div>
          <div className={Style.Product_data_box}>
            <div className={Style.Product_data_single}></div>
            <div className={Style.Product_data_single}></div>
          </div>
          <button className={Style.Product_data_export_btn}>export data</button>
        </div>
        <div className={Style.Product_post_card_section}>
          <div className={Style.Product_post_card_box}>
            <h1>memberships</h1>
            <div className={Style.Product_post_card}>
              <div className={Style.Product_post_card_img_box}>
                <Image className={Style.qr_image} src={images.qr} alt="image" />
              </div>

              <div className={Style.Product_card_btn_box}>
                <button>Order labels</button>
                <button>quantity</button>
              </div>

              <div className={Style.Product_card_btn_box}>
                <button>Order labels</button>
                <button>quantity</button>
              </div>
              <div className={Style.Product_card_download_btn}>
                Create and Download
              </div>
            </div>
            <p>
              -Each Item is equivalent to one label or NFC. <br /> <br />
              -When you post your item to Bump-me it is the item is tracked on
              the blockchain and when the qr code isscanned and marked as sold
              an nft will be minted as a receipt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductData;
