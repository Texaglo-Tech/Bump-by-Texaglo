import React, { useState } from "react";
import PostProduct from "./../components/PostProduct";
import ProductData from "./../components/ProductData/index";
import DataComp from "../components/DataComp/index";
import Customize from "../components/Customize/index";
import Survey from "../components/Survey/index";
import AddAi from "../components/AddAi/index";
import NavProfile from "../components/NavProfile/index";
import SideBarAnalytics from "../components/SideBarAnalytics/index";
import SideBar from "../components/SideBar/index";

const Dashboard = () => {
  const [index, setIndex] = useState(1);

  return (
    <>
      <SideBar />

      <SideBarAnalytics setIndex={setIndex}/>

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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
