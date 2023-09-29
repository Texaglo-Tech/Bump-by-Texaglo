import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./DataComp.module.css";
import images from "../../assets";

const DataComp = () => {
  return (
    <>
      <div className={Style.data_section}>
        <h1> Bump-me Data</h1>
        <div className={Style.data_box}>
          <div className={Style.data_box_single}>
            <Image className={Style.circle} src={images.circle} alt="image" />
            <p>$10,000</p>
          </div>
          <div className={Style.data_box_single}>
            <Image className={Style.circle} src={images.circle} alt="image" />
            <p>500 Sol</p>
          </div>
        </div>
        <div className={Style.data_information_box}>
          <div className={Style.data_bars}>
            <h3>Data collected </h3>
            <div className={Style.data_bars_single}>
              <p>Reviews</p>
              <progress id="p0" value="85" max="100"></progress>
            </div>
            <div className={Style.data_bars_single}>
              <p>Male</p>
              <progress id="p0" value="50" max="100"></progress>
            </div>
            <div className={Style.data_bars_single}>
              <p>Female</p>
              <progress id="p0" value="65" max="100"></progress>
            </div>
            <div className={Style.data_bars_single}>
              <p>Happy</p>
              <progress id="p0" value="35" max="100"></progress>
            </div>
            <div className={Style.data_bars_single}>
              <p>unhappy</p>
              <progress id="p0" value="65" max="100"></progress>
            </div>
            <div className={Style.data_bars_single}>
              <p>clicks to </p>
              <progress id="p0" value="65" max="100"></progress>
            </div>
          </div>
          <div className={Style.data_graph}>
            <h3>Data collected </h3>
            <div className={Style.data_graph_box}></div>
          </div>
        </div>
        <div className={Style.data_export_btn}>export data</div>
      </div>
    </>
  );
};

export default DataComp;
