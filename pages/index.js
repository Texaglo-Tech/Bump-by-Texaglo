import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeroSection from "../Components/HeroSection/HeroSection";
import Partners from "../Components/Partners/Partners";
import BlogSections from "../Components/BlogSections/BlogSections";
import EventsSections from "../Components/EventsSections/EventsSections";
import ProjectsSections from "../Components/ProjectsSections/ProjectsSections";
import AiBot from "../Components/AiBot/AiBot";
import SideBar from "../Components/SideBar/SideBar";

export default function Home() {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.container} style={{ padding: "0% 10%" }}>
      <Head>
        <title>Texaglo Hackathon</title>
        <meta name="description" content="Texaglo Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />
      <HeroSection />
      <Partners />
      <BlogSections />
      <EventsSections />
      <ProjectsSections />
      <AiBot />
    </div>
  );
}
