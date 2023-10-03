import React, { useState, useRef } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Product.module.css";
import images from "../../assets";
import { toast } from "react-toastify";

const Product = ({id}) => {
  const addFile = async (e) => {};

  const saveAndDeploy = async () => {};

  return (
    <>
      <div className={Style.Product_section}>
        <div className={Style.Product_post_card_section}>
          <div className={Style.Product_post_card_box}>
            <div className={Style.Product_post_card}>
              <div className={Style.Product_post_card_img_box}>
                <Image
                  className={Style.c_v_ctrl_img}
                  src={images.c_v_ctrl}
                  alt="image"
                />
                <div className={Style.Product_post_card_img_content}>
                  <button className={Style.buy_now_btn}>BUY NOW</button>
                  <h2>{/* {product_data.product_name} */}</h2>
                  <p>{/* {product_data.product_desc} */}</p>
                  <div className={Style.Product_post_card_img_content_btn_one}>
                    <button>ADD TO CART</button>
                    <button>OPEN PAGE</button>
                  </div>
                  <div className={Style.Product_post_card_img_content_btn_two}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export async function getServerSideProps(context) {
    const { id } = context.query;
  
    return {
      props: {
        id,
      },
    };
  }

export default Product;
