import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Customize.module.css";
import images from "../../assets";

const Customize = () => {
  return (
    <>
      <div className={Style.Product_section}>
        <div className={Style.Product_post_section}>
          <h1>Customize Bump-me</h1>
          <div className={Style.Product_post_input}>
            <div className={Style.Product_data_input}>
              <div className={Style.content_input}>
                <label htmlFor="">named:</label>
                <input type="text" />
              </div>
              <div className={Style.content_input}>
                <label htmlFor="">cost:</label>
                <input type="text" />
              </div>
            </div>
            <div className={Style.Product_file_input_box}>
              <div className={Style.Product_file_input}></div>
              <div className={Style.Product_file_input}></div>
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

export default Customize;
