import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./AddAi.module.css";
import images from "../../assets";

const AddAi = () => {
  return (
    <>
      <div className={Style.Product_section}>
        <div className={Style.Product_post_section}>
          <h1>Add Ai to Bump-me</h1>
          <div className={Style.Product_post_input}>
            <div className={Style.toggle_switch_container}>
              <div className={`${Style.toggleswitch} ${Style.switch_vertical}`}>
                <input
                  id="toggle-a"
                  type="radio"
                  name="switch"
                  checked="checked"
                />
                <label htmlFor="toggle-a">On</label>
                <input id="toggle-b" type="radio" name="switch" />
                <label htmlFor="toggle-b">Off</label>
                <span className={Style.toggle_outside}>
                  <span className={Style.toggle_inside}></span>
                </span>
              </div>
            </div>
          </div>
          <div className={Style.Product_file_input_box}>
            <div className={Style.Product_file_input}>
              <Image className={Style.circle} src={images.circle} alt="image" />
              <span>+</span>
              <p>Add image</p>
            </div>
          </div>
        </div>
        <div className={Style.Product_post_card_section}>
          <div className={Style.Product_post_card_box}>
            <h1>Preview </h1>
            <div className={Style.Product_post_card}>
              <div className={Style.Product_post_card_img_box}>
                <Image
                  className={Style.c_v_ctrl_img}
                  src={images.c_v_ctrl}
                  alt="image"
                />
                <div className={Style.Product_post_card_img_content}>
                  <button className={Style.buy_now_btn}>BUY NOW</button>
                  <h2>Product Name</h2>
                  <p>
                    Product Description Product Description Product Description
                    Product Description Product{" "}
                  </p>
                  <div className={Style.Product_post_card_img_content_btn_one}>
                    <button>ADD TO CART</button>
                    <button>OPEN PAGE</button>
                  </div>
                  <div className={Style.Product_post_card_img_content_btn_two}>
                    <button>Website</button>
                    <button>Survey questions</button>
                  </div>
                </div>
              </div>
              <div className={Style.card_save_btn}>Save and Deploy</div>
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

export default AddAi;
