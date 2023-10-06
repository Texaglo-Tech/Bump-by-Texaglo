import React, { useEffect, useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./BlogSections.module.css";
import BlogCard from "../BlogCard/BlogCard";

import { getProducts } from "../../api";
import { Grid } from "@mui/material";
const BlogSections = () => {

  const [products, setProducts] = useState([])

  useEffect(()=>{
    getProducts().then((data)=>{
      if(data.success)setProducts(data.message)
    })
  }, [])

  return (
    <div className={Style.blog_section}>
      <h1 className={Style.blog_section_title}>Products</h1>
      <div className={Style.blog_card_list}>
      <Grid container spacing={2}>
        {products.map((product, index)=>(
          <Grid item xs={12} md={4} key={index}>
            <BlogCard product={product} />
          </Grid>
        ))}
        </Grid>
      </div>
    </div>
  );
};

export default BlogSections;
