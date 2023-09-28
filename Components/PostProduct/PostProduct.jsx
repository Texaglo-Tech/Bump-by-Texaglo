import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./PostProduct.module.css";
import images from "../../assets";

const PostProduct = () => {
  return (
    <>
      <div className={Style.Product_section}>
        <div className={Style.Product_post_section}>
          <h1>Post a product to Bump-me</h1>
          <div className={Style.Product_post_input}>
            <div className={Style.Product_data_input}>
              {/*  */}

              <div className={Style.toggle_switch_container}>
                <div
                  className={`${Style.toggleswitch} ${Style.switch_vertical}`}
                >
                  <input
                    id="toggle-a"
                    type="radio"
                    name="switch"
                    checked="checked"
                  />
                  <label htmlFor="toggle-a">local product</label>
                  <input id="toggle-b" type="radio" name="switch" />
                  <label htmlFor="toggle-b">Digital product</label>
                  <span className={Style.toggle_outside}>
                    <span className={Style.toggle_inside}></span>
                  </span>
                </div>
              </div>
              {/*  */}

              <p>I want my product to be :</p>

              <div className={Style.content_input}>
                <label htmlFor="">named:</label>
                <input type="text" />
              </div>
              <div className={Style.content_input}>
                <label htmlFor="">cost:</label>
                <input type="text" />
              </div>
              <div className={Style.content_input}>
                <label htmlFor="">Described: </label>
                <textarea
                  id="w3review"
                  name="w3review"
                  rows="4"
                  cols="50"
                ></textarea>
              </div>
            </div>

            <div className={Style.Product_file_input}></div>
          </div>
          <div className={Style.Product_post_options_btn}>
            <div className={Style.Product_post_toggle}>
              <div className={Style.toggle_switch_container}>
                <label htmlFor="" className={Style.Product_post_toggle_title}>
                  Link Method:
                </label>

                <div
                  className={`${Style.toggleswitch} ${Style.switch_vertical}`}
                >
                  <input
                    id="toggle-a"
                    type="radio"
                    name="switch"
                    checked="checked"
                  />
                  <label htmlFor="toggle-a">local product</label>
                  <input id="toggle-b" type="radio" name="switch" />
                  <label htmlFor="toggle-b">Digital product</label>
                  <span className={Style.toggle_outside}>
                    <span className={Style.toggle_inside}></span>
                  </span>
                </div>
              </div>
            </div>
            <div className={Style.Product_post_toggle}>
              <div className={Style.toggle_switch_container}>
                <label htmlFor="" className={Style.Product_post_toggle_title}>
                  Payement type:
                </label>

                <div
                  className={`${Style.toggleswitch} ${Style.switch_vertical}`}
                >
                  <input
                    id="toggle-a"
                    type="radio"
                    name="switch"
                    checked="checked"
                  />
                  <label htmlFor="toggle-a">Dollars</label>
                  <input id="toggle-b" type="radio" name="switch" />
                  <label htmlFor="toggle-b">Crypto</label>
                  <span className={Style.toggle_outside}>
                    <span className={Style.toggle_inside}></span>
                  </span>
                </div>
              </div>
            </div>
            <div className={Style.Product_post_toggle}>
              <div className={Style.toggle_switch_container}>
                <label className={Style.Product_post_toggle_title} htmlFor="">
                  Qr Code Type:
                </label>

                <div
                  className={`${Style.toggleswitch} ${Style.switch_vertical}`}
                >
                  <input
                    id="toggle-a"
                    type="radio"
                    name="switch"
                    checked="checked"
                  />
                  <label htmlFor="toggle-a">Physical</label>
                  <input id="toggle-b" type="radio" name="switch" />
                  <label htmlFor="toggle-b">Digital</label>
                  <span className={Style.toggle_outside}>
                    <span className={Style.toggle_inside}></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={Style.Product_order_btn}>
            Order qr And Create Product
          </div>
        </div>
        <div className={Style.Product_post_card_section}>
          <div className={Style.Product_post_card_box}>
            <h1>Qr Code</h1>
            <div className={Style.Product_post_card}>
              <h1 className={Style.Product_post_card_title}>Cost: $0</h1>
              <div className={Style.Product_post_card_img_box}>
                <Image className={Style.qr_image} src={images.qr} alt="image" />
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

export default PostProduct;
