import React from "react";
import PostProduct from "../Components/PostProduct/PostProduct";
import ProductData from "../Components/ProductData/ProductData";
import DataComp from "../Components/DataComp/DataComp";
import Customize from "../Components/Customize/Customize";
import Survey from "../Components/Survey/Survey";
import AddAi from "../Components/AddAi/AddAi";

const dashboard = () => {
  return (
    <div className="dashboard_page">
      <div className="dashboard_comp">
        <PostProduct />
        {/* <ProductData /> */}
        {/* <DataComp /> */}
        {/* <Customize /> */}
        {/* <Survey /> */}
        {/* <AddAi /> */}
      </div>
    </div>
  );
};

export default dashboard;
