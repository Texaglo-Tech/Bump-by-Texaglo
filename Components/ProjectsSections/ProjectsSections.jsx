import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import style from "./ProjectsSections.module.css";
import ProjectCard from "../ProjectCard/ProjectCard";

const ProjectsSections = () => {
  return (
    <div className={style.project_section}>
      <h1 className={style.project_section_title}>Projects</h1>
      <div className={style.project_card_list}>
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsSections;
