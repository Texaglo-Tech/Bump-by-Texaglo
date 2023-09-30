import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Home.module.css";
import HeroSection from "../Components/HeroSection/HeroSection";
import Partners from "../Components/Partners/Partners";
import BlogSections from "../Components/BlogSections/BlogSections";
import EventsSections from "../Components/EventsSections/EventsSections";
import ProjectsSections from "../Components/ProjectsSections/ProjectsSections";
import AiBot from "../Components/AiBot/AiBot";

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Texaglo hackathon</title>
        <meta name="description" content="Texaglo service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <Partners />
      <BlogSections />
      <EventsSections />
      <ProjectsSections />
      <AiBot />
    </div>
  );
}
