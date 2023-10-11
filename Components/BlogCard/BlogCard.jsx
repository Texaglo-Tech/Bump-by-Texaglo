import React, { useEffect, useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./BlogCard.module.css";
import images from "../../assets";
import jwt from 'jsonwebtoken';

import { useGlobal } from "../../context/GlobalContext";
import { useRouter } from "next/router";

const config = require("./../../config.json");

const BlogCard = ({ product }) => {

  const router = useRouter()
  const { editProductHandle, productDataHandle, editproductDataHandle, product_data } = useGlobal();

  const [userId, setUserId] = useState("")
  useEffect(()=>{
    const decodedToken = jwt.decode(localStorage.getItem("token"));
    
    setUserId(decodedToken?.id);
  }, [])

  const editHandle = () => {
    editProductHandle(true);    
    editproductDataHandle(product)
    router.push("/dashboard");
  } 
  
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
            <div className={Style.blog_button_container}>
              {product?.user_id == userId ?
              <div className={Style.blog_content_bottom_btn} onClick={()=>{editHandle()}}>
                <Image
                  className={Style.blog_content_bottom_btn_eye}
                  src={images.eye}
                  alt="image"
                />
                <p>Edit</p>
              </div>
              :null
              }
              <div className={Style.blog_content_bottom_btn} onClick={()=>{window.open(`product/${product?.product_id}`, "_blank")}}>
                <Image
                  className={Style.blog_content_bottom_btn_eye}
                  src={images.eye}
                  alt="image"
                />
                <p>Reads</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
