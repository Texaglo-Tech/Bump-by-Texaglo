import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./EventsSections.module.css";
import images from "../../assets";
import EventCard from "../EventCard";

const EventsSections = () => {
  return (
    <div className={Style.events_section}>
      <h1 className={Style.events_section_title}>Events</h1>
      <div className={Style.events_card_list}>
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default EventsSections;
