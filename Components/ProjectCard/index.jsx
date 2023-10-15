import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./ProjectCard.module.css";
import images from "../../assets";

const ProjectCard = () => {
  return (
    <div className={Style.project_card} style={{ margin: "5px 20px", height: "90%" }}>
      <div className={Style.project_images_section}>
        {/* <Image
          className={Style.project_images}
          src={images.event_1}
          alt="image"
        /> */}
      </div>
      <div className={Style.project_content}>
        <h1>Coinbase X D_D Bogotá Meetup</h1>
        <p>Espacio en Blanco, Cl. 48 #6 - 14, Bogotá, Cundinamarca, Colombia</p>
        <hr />
        <div className={Style.project_content_bottom}>
          <Image
            className={Style.project_content_bottom_img_1}
            src={images.navpic}
            alt="image"
          />
          <Image
            className={Style.project_content_bottom_img_2}
            src={images.profile_pic}
            alt="image"
          />
          <div className={Style.project_content_bottom_btn}>
            <Image
              className={Style.project_content_bottom_btn_arrow}
              src={images.double_arrow}
              alt="image"
            />
            <p>Details</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
