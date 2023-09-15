import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./BlogSections.module.css";
import images from "../../assets";
import BlogCard from "../BlogCard/BlogCard";

const BlogSections = () => {
  return (
    <div className={Style.Blog_Section}>
      <h1 className={Style.Blog_Section_title}>Blog</h1>
      <div className={Style.blog_card_list}>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default BlogSections;
