import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./BlogCard.module.css";
import images from "../../assets";
const config = require("./../../config.json");

const BlogCard = ({ product }) => {
  return (
    <>
      <div className={Style.blog_card}>
        <div className={Style.blog_images_section}>
          {product?.product_file != "" ? (
            <img src={`${config.backend_url}/${product?.product_file}`}  className={Style.blog_images} alt="image"/>
          ) : (
            <Image
              className={Style.blog_images}
              src={images.blog_1}
              alt="image"
            />
          )}
        </div>
        <div className={Style.blog_content}>
          <div className={Style.blog_content_top}>
            <div className={Style.blog_content_top_btn}>
              {product?.product_type == "local" ? "Local" : "NFT"}
            </div>
          </div>
          <h1>{product?.product_name}</h1>
          <p>{product?.product_desc}</p>
          <hr />
          <div className={Style.blog_content_bottom}>
            <Image
              className={Style.blog_content_bottom_img_1}
              src={images.navpic}
              alt="image"
            />
            <Image
              className={Style.blog_content_bottom_img_2}
              src={images.profile_pic}
              alt="image"
            />
            <div className={Style.blog_content_bottom_btn}>
              <Image
                className={Style.blog_content_bottom_btn_eye}
                src={images.eye}
                alt="image"
              />
              <p>Read</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
