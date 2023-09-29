import React, { useState } from "react";
import PostProduct from "../Components/PostProduct/PostProduct";
import ProductData from "../Components/ProductData/ProductData";
import DataComp from "../Components/DataComp/DataComp";
import Customize from "../Components/Customize/Customize";
import Survey from "../Components/Survey/Survey";
import AddAi from "../Components/AddAi/AddAi";
import NavProfile from "../Components/NavProfile/NavProfile";
import SideBarAnalytics from "../Components/SideBarAnalytics/SideBarAnalytics";

const dashboard = () => {
  const [index, setIndex] = useState(1);

  return (
    <>
      <SideBarAnalytics setIndex={setIndex} />
      <div className="dashboard_page">
        <div className="dashboard_top_nav">
          <div className="dashboard_top_title">
            <p>Bump-me</p>
            <h1>DASHBOARD</h1>
          </div>
          <NavProfile />
        </div>
        <div className="dashboard_comp">
          {index == 1 && <PostProduct />}
          {index == 2 && <ProductData />}
          {index == 3 && <DataComp />}
          {index == 4 && <Customize />}
          {index == 5 && <Survey />}
          {index == 6 && <AddAi />}

          {/* <ProductData /> */}
          {/* <DataComp /> */}
          {/* <Customize /> */}
          {/* <Survey /> */}
          {/* <AddAi /> */}
        </div>
      </div>
    </>
  );
};

export default dashboard;
