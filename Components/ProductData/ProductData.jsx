import React, { useState, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./ProductData.module.css";
import images from "../../assets";

import { getProductSummary } from "../../api";
import {
  addMembershipDiscount,
  exportToExcel,
  getUserIdFromToken,
} from "../../api";
import { toast } from "react-toastify";

const ProductData = () => {
  const [summary_data, setSummaryData] = useState({
    scans_cnt: 0,
    clicks_cnt: 0,
    online_sales_cnt: 0,
    local_sales_cnt: 0,
    fee: "",
    percent: "",
  });

  useEffect(() => {
    const data = {
      user_id: getUserIdFromToken(),
    };
    getProductSummary(data).then((res) => {
      if (res.success) {
        setSummaryData({
          ...summary_data,
          scans_cnt: res.data.scans_cnt,
          clicks_cnt: res.data.clicks_cnt,
          online_sales_cnt: res.data.online_sales_cnt,
          local_sales_cnt: res.data.local_sales_cnt,
        });
      }
    });
  }, []);

  const exportData = async () => {
    console.log("export Data...");
    const data = [
      {
        Scans: summary_data.scans_cnt,
        Clicks: summary_data.clicks_cnt,
        "Online Sales": summary_data.online_sales_cnt,
        "Local Sales": summary_data.local_sales_cnt,
      },
    ];
    exportToExcel("data", data);
  };

  const addMemberDiscount = async () => {
    console.log("addMemberDiscount...");
    console.log(summary_data);
    if (summary_data.fee == "") {
      toast.warning("Please input fee!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (summary_data.percent == "") {
      toast.warning("Please input percent!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    const data = {
      user_id: getUserIdFromToken(),
      product_id: 1,
      fee: summary_data.fee,
      percent: summary_data.percent,
    };
    await addMembershipDiscount(data);
  };

  return (
    <>
      <div className={Style.Product_section}>
        <div className={Style.Product_post_section}>
          <h1>Bump-me Product Data</h1>
          <div className={Style.Product_data_box}>
            <div className={Style.Product_data_single}>
              <Image className={Style.circle} src={images.circle} alt="image" />
              <p>{summary_data?.scans_cnt}</p>
              <span>Scans</span>
            </div>
            <div className={Style.Product_data_single}>
              <Image className={Style.circle} src={images.circle} alt="image" />
              <p>{summary_data.clicks_cnt}</p>
              <span>Clicks</span>
            </div>
          </div>
          <div className={Style.Product_data_box}>
            <div className={Style.Product_data_single}>
              <Image className={Style.circle} src={images.circle} alt="image" />
              <p>{summary_data.online_sales_cnt}</p>
              <span>Online Sales</span>
            </div>
            <div className={Style.Product_data_single}>
              <Image className={Style.circle} src={images.circle} alt="image" />
              <p>{summary_data.local_sales_cnt}</p>
              <span>Local Sales</span>
            </div>
          </div>
          <button
            onClick={exportData}
            className={Style.Product_data_export_btn}
          >
            export data
          </button>
        </div>
        <div className={Style.Product_post_card_section}>
          <div className={Style.Product_post_card_box}>
            <h1>memberships</h1>
            <div className={Style.Product_post_card}>
              <div className={Style.Product_post_card_img_box}>
                <Image
                  className={Style.card_circle}
                  src={images.circle}
                  alt="image"
                />
                <p>10</p>
              </div>

              <div className={Style.Product_card_btn_box}>
                <button>Fee</button>
                <input
                  placeholder="Price"
                  onChange={(e) =>
                    setSummaryData({
                      ...summary_data,
                      fee: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={Style.Product_card_btn_box}>
                <button>Discount</button>
                <input
                  placeholder="Percent"
                  onChange={(e) =>
                    setSummaryData({
                      ...summary_data,
                      percent: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div
                onClick={addMemberDiscount}
                className={Style.Product_card_download_btn}
              >
                Add member discount
              </div>
            </div>
            <p>
              -Each Item is equivalent to one label or NFC. <br /> <br />
              -When you post your item to Bump-me it is the item is tracked on
              the blockchain and when the qr code isscanned and marked as sold
              an nft will be minted as a receipt.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductData;
