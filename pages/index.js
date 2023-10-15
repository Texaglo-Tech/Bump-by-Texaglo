import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import HeroSection from "../components/HeroSection/HeroSection";
import Partners from "../components/Partners/Partners";
import BlogSections from "../components/BlogSections/BlogSections";
import EventsSections from "../components/EventsSections/EventsSections";
import ProjectsSections from "../components/ProjectsSections/ProjectsSections";
import AiBot from "../components/AiBot/AiBot";
import SideBar from "../components/SideBar/SideBar";

export default function Home() {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.container} style={{ padding: "0% 10%", background:"black" }}>
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
