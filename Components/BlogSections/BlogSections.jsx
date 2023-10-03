import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./BlogSections.module.css";
import BlogCard from "../BlogCard/BlogCard";

const BlogSections = () => {
  return (
    <div className={Style.blog_section}>
      <h1 className={Style.blog_section_title}>Blog</h1>
      <div className={Style.blog_card_list}>
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </div>
  );
};

export default BlogSections;
