import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import HeroSection from "../Components/HeroSection/HeroSection";
import Partners from "../Components/Partners/Partners";
import BlogSections from "../Components/BlogSections/BlogSections";
import EventsSections from "../Components/EventsSections/EventsSections";
import ProjectsSections from "../Components/ProjectsSections/ProjectsSections";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <Partners />
      <BlogSections />
      <EventsSections />
      <ProjectsSections />
    </div>
  );
}