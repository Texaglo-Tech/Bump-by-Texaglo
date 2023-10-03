import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./BlogCard.module.css";
import images from "../../assets";

const BlogCard = () => {
  return (
    <>
      <div className={Style.blog_card}>
        <div className={Style.blog_images_section}>
          <Image
            className={Style.blog_images}
            src={images.blog_1}
            alt="image"
          />
        </div>
        <div className={Style.blog_content}>
          <div className={Style.blog_content_top}>
            <div className={Style.blog_content_top_btn}>Web3</div>
            <div className={Style.blog_content_top_btn}>DeFi</div>
          </div>
          <h1>A Gentle Introduction to Decentralized Storage</h1>
          <p>
            A blog post explaining Decentralized storage, how it works, and
            popular dStorage protocols & platforms like IPFS, Swarm, Filecoin,
            etc.
          </p>
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
