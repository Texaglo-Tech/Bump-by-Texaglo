import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./EventsSections.module.css";
import images from "../../assets";
import EventCard from "../EventCard/EventCard";

const EventsSections = () => {
  return (
    <div className={Style.Events_Section}>
      <h1 className={Style.Events_Section_title}>Events</h1>
      <div className={Style.events_card_list}>
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default EventsSections;
