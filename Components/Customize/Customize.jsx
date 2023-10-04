import React, { useState, useRef } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Customize.module.css";
import images from "../../assets";
import {
  getCurrentProductId,
  getUserIdFromToken,
  uploadImgForItem,
} from "../../api";
import { toast } from "react-toastify";
import { useGlobal } from "../../context/GlobalContext";
import { customizeDeploy } from "../../api";
import { Grid, Hidden } from '@mui/material';

const Customize = () => {
  const fileInputRef = useRef(null);
  const { productDataHandle, product_data } = useGlobal();

  const addFile = async (e) => {
    const selectedFile = e.target.files[0];
    console.log("Current product id is ", getCurrentProductId());
    if (!getCurrentProductId()) {
      toast.warning("Please create the product first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", getUserIdFromToken());
    formData.append("product_id", getCurrentProductId());
    const res = await uploadImgForItem(formData);
    if (res.success) {
      console.log(res.data);
      console.log("added the item img of product ");
    }
  };

  const saveAndDeploy = async () => {
    console.log("deploying...");
    console.log("Current product id is ", getCurrentProductId());
    if (!getCurrentProductId()) {
      toast.warning("Please create the product first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    const data = {
      background_color: product_data.background_color,
      button1_color: product_data.button1_color,
      button2_color: product_data.button2_color,
      buy_color: product_data.buy_color,
      website: product_data.website,
      link: product_data.link,
      product_id: getCurrentProductId(),
      user_id: getUserIdFromToken(),
    };

    await customizeDeploy(data);
  };

  return (
    <>
      <div className={Style.product_section}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sx={{padding:"30px"}}>
            <div className={Style.product_post_section}>
              <h1>Customize Bump-me</h1>
              <div className={Style.product_post_input}>
                <div className={Style.product_data_input}>
                  <div className={Style.content_input}>
                    <label htmlFor="">Bacground:</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        productDataHandle("background_color", e.target.value);
                      }}
                    />
                  </div>
                  <div className={Style.content_input}>
                    <label htmlFor="">Button One:</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        productDataHandle("button1_color", e.target.value);
                      }}
                    />
                  </div>
                  <div className={Style.content_input}>
                    <label htmlFor="">Button Two:</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        productDataHandle("button2_color", e.target.value);
                      }}
                    />
                  </div>
                  <div className={Style.content_input}>
                    <label htmlFor="">Buy Now:</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        productDataHandle("buy_color", e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={Style.product_file_input_box}>
                  <div
                    className={Style.product_file_input}
                    onClick={() => fileInputRef.current.click()}
                    onChange={addFile}
                  >
                    <Image
                      className={Style.circle}
                      src={images.circle}
                      alt="image"
                    />
                    <span>+</span>
                    <p>Add image</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div
                    className={Style.product_file_input}
                    onClick={() => {
                      productDataHandle("website", true);
                    }}
                  >
                    <Image
                      className={Style.circle}
                      src={images.circle}
                      alt="image"
                    />
                    <span>+</span>
                    <p>Add website</p>
                  </div>
                  <div className={Style.website_input}>
                    <label htmlFor="">link:</label>
                    <input
                      type="text"
                      onChange={(e) => {
                        productDataHandle("link", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={Style.product_post_card_section}>
              <div className={Style.product_post_card_box}>
                <h1>Preview </h1>
                <div className={Style.product_post_card}>
                  <div
                    className={Style.product_post_card_img_box}
                    style={{
                      backgroundColor:
                        product_data.background_color != ""
                          ? product_data.background_color
                          : null,
                    }}
                  >
                    {product_data.product_file ? (
                      <img
                        src={product_data.product_file}
                        alt="product"
                        className={Style.c_v_ctrl_img}
                      />
                    ) : (
                      <Image
                        className={Style.c_v_ctrl_img}
                        src={images.c_v_ctrl}
                        alt="image"
                      />
                    )}

                    <div className={Style.product_post_card_img_content}>
                      <button
                        className={Style.buy_now_btn}
                        style={{
                          background:
                            product_data.buy_color != ""
                              ? product_data.buy_color
                              : null,
                        }}
                      >
                        BUY NOW
                      </button>
                      <h2>{product_data.product_name}</h2>
                      <p>{product_data.product_desc}</p>
                      <div className={Style.product_post_card_img_content_btn_one}>
                        <button
                          style={{
                            background:
                              product_data.button1_color != ""
                                ? product_data.button1_color
                                : null,
                          }}
                        >
                          {product_data.button1_color}ADD TO CART
                        </button>
                        <button
                          style={{
                            background:
                              product_data.button2_color != ""
                                ? product_data.button2_color
                                : null,
                          }}
                        >
                          OPEN PAGE
                        </button>
                      </div>
                      <div className={Style.product_post_card_img_content_btn_two}>
                        {product_data.website ? (
                          <button
                            onClick={() => window.open(product_data.link, "_blank")}
                          >
                            Website
                          </button>
                        ) : null}
                        {product_data.survey ? (
                          <button>Survey questions</button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className={Style.card_save_btn} onClick={saveAndDeploy}>
                    Save and Deploy
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
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Customize;
