import React, { useEffect, useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./DataComp.module.css";
import images from "../../assets";

import { getSummary, exportToExcel, getUserIdFromToken } from "../../api";

import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from '@mui/material';

const DataComp = () => {

  const [summary_data, setSummaryData] = useState({
    cash_flow: 0,
    crypto_flow: 0,
    review: 0,
    male:0,
    female:0,
    happy:0,
    unhappy:0,
    click_to:0,
    collected_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  })

  useEffect(()=> {
    const data = {
      user_id: getUserIdFromToken()
    }

    getSummary(data).then((res)=>{
      if(res.success){
        setSummaryData({
          ...summary_data,
          cash_flow: res.data.cash_flow,
          crypto_flow: res.data.crypto_flow,
          review: res.data.review,
          male: res.data.male,
          female: res.data.female,
          happy: res.data.happy,
          unhappy: res.data.unhappy,
          click_to: res.data.click_to,
          collected_data: res.data.collected_data
        })
      }
    })
  }, [])
  
  const exportDataHandle = ()=> {
    console.log("export data...")
    const data = [{CashFlow: summary_data.cash_flow, CryptoFlow: summary_data.crypto_flow, Reviews: summary_data.review, Male: summary_data.male,
      Female: summary_data.female, Happy: summary_data.happy, UnHappy: summary_data.unhappy, click_to: summary_data.click_to
    }]
    exportToExcel("data", data)    
  }

  return (
    <>
      <div className={Style.data_section}>
        <h1> Bump-me Data</h1>
        <div className={Style.data_box}>
          <div className={Style.data_box_single}>
            <Image className={Style.circle} src={images.circle} alt="image" />
            <p>${summary_data.cash_flow}</p>
          </div>
          <div className={Style.data_box_single}>
            <Image className={Style.circle} src={images.circle} alt="image" />
            <p>{summary_data.crypto_flow} Sol</p>
          </div>
        </div>
        <div className={Style.data_information_box}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ paddingLeft: "45px !important", paddingRight: "30px"}}>
              <div className={Style.data_bars}>
                <h3>Data collected </h3>
                <div className={Style.data_bars_single}>
                  <p>Reviews</p>
                  <progress id="p0" value={summary_data.review} max="100"></progress>
                </div>
                <div className={Style.data_bars_single}>
                  <p>Male</p>
                  <progress id="p0" value={summary_data.male} max="100"></progress>
                </div>
                <div className={Style.data_bars_single}>
                  <p>Female</p>
                  <progress id="p0" value={summary_data.female} max="100"></progress>
                </div>
                <div className={Style.data_bars_single}>
                  <p>Happy</p>
                  <progress id="p0" value={summary_data.happy} max="100"></progress>
                </div>
                <div className={Style.data_bars_single}>
                  <p>unhappy</p>
                  <progress id="p0" value={summary_data.unhappy} max="100"></progress>
                </div>
                <div className={Style.data_bars_single}>
                  <p>clicks to </p>
                  <progress id="p0" value={summary_data.click_to} max="100"></progress>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={Style.data_graph}>
                <h3>Data collected </h3>
                <div className={Style.data_graph_box}>
                <BarChart
                  series={[
                    { data: summary_data.collected_data, stack: 'A', label: 'Months' },
                  ]}
                  height={300}
                />
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className={Style.data_export_btn} onClick={exportDataHandle}>Export Data</div>
      </div>
    </>
  );
};

export default DataComp;
