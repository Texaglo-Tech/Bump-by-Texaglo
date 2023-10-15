import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./EventCard.module.css";
import images from "../../assets";

const EventCard = () => {
  return (
    <div className={Style.event_card} style={{ margin: "5px 20px", height: "90%" }}>
      <div className={Style.event_images_section}>
        <Image
          className={Style.event_images}
          src={images.event_1}
          alt="image"
        />
      </div>
      <div className={Style.event_content}>
        <div className={Style.event_content_top}>
          <p>7:00 PM • 2:00 AM</p>
        </div>
        <h1>Coinbase X D_D Bogotá Meetup</h1>
        <p>Espacio en Blanco, Cl. 48 #6 - 14, Bogotá, Cundinamarca, Colombia</p>
        <hr />
        <div className={Style.event_content_bottom}>
          <Image
            className={Style.event_content_bottom_img_1}
            src={images.navpic}
            alt="image"
          />
          <Image
            className={Style.event_content_bottom_img_2}
            src={images.profile_pic}
            alt="image"
          />
          <div className={Style.event_content_bottom_btn}>
            <Image
              className={Style.event_content_bottom_btn_eye}
              src={images.elec}
              alt="image"
            />
            <p>Interested</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
