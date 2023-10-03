import React, { useRef, useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./AddAi.module.css";
import images from "../../assets";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useGlobal } from "../../context/GlobalContext";
import { aiDeploy } from "../../api";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: "80px",
  height: "45px",
  transform: "rotate(90deg)",
  borderRadius: "100px",
  "& .MuiSwitch-switchBase": {
    borderRadius: "100px",
    transform: "translate(6px, 6px)",
    "&.Mui-checked": {
      transform: "translate(39px, 6px)",
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#551BF9",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#7748f769 !important",
    borderRadius: 32 / 2,
    opacity: 1,
    boxSizing: "border-box",
  },
}));

const AddAi = () => {
  const { productDataHandle, product_data } = useGlobal();
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const aiDeployHandle = async (e) => {
    console.log("Current product id is ", getCurrentProductId());
    if (!getCurrentProductId()) {
      toast.warning("Please create the product first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", getUserIdFromToken());
    formData.append("product_id", getCurrentProductId());
    formData.append("ai", product_data.ai);
    const res = await aiDeploy(formData);
    if (res.success) {
      console.log(res.data);
      console.log("added the pdf for ai product assist");
    }
  };

  return (
    <>
      <div className={Style.product_section}>
        <div className={Style.product_post_section}>
          <h1>Add Ai to Bump-me</h1>
          <div className={Style.product_post_input}>
            <div className={Style.toggle_switch_container}>
              <div
                style={{
                  display: "flex",
                  marginLeft: "-30px",
                  marginTop: "30px",
                }}
              >
                <AntSwitch
                  onChange={() => {
                    productDataHandle("ai", product_data.ai ? false : true);
                  }}
                  inputProps={{ "aria-label": "ant design" }}
                />

                <div
                  style={{
                    marginLeft: "-15px",
                    marginTop: "-5px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label
                    style={{ fontSize: "17px", color: "white" }}
                    onClick={() => {
                      productDataHandle("ai", true);
                    }}
                  >
                    On
                  </label>
                  <span style={{ height: "10px" }}></span>
                  <label
                    style={{ fontSize: "17px", color: "white" }}
                    onClick={() => {
                      productDataHandle("ai", false);
                    }}
                  >
                    Off
                  </label>
                </div>
              </div>
              <div
                style={{
                  alignItems: "center",
                  textAlign: "center",
                  display: "flex",
                  padding: "20px",
                  marginTop: "20px",
                }}
              >
                admin can turn the ai on or off which on their products
              </div>
            </div>
          </div>
          <div className={Style.product_file_input_box}>
            <div
              className={Style.product_file_input}
              onClick={() => fileInputRef.current.click()}
              onChange={() => setFile(e.target.files[0])}
            >
              <Image className={Style.circle} src={images.circle} alt="image" />
              <span>+</span>
              <p>Add Product info pdf</p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>
        <div className={Style.product_post_card_section}>
          <div className={Style.product_post_card_box}>
            <h1>Preview </h1>
            <div className={Style.product_post_card}>
              <h3
                style={{ color: "white", padding: "20px", textAlign: "center" }}
              >
                the ai is overlayed on top of the application when the user says
                the keyword “Help Me”
              </h3>

              <div className={Style.product_post_card_img_box}>
                <div className={Style.product_post_card_img_content}>
                  <h3 style={{ color: "black" }}>How can I assist ?</h3>
                  <div style={{ marginTop: "30px" }}>
                    <Image src={images.ai_help} alt="image" />
                  </div>
                  <div className={Style.product_post_card_img_content_btn_two}>
                    <button>Casper is Thinking</button>
                  </div>
                </div>
              </div>
              <div className={Style.card_save_btn} onClick={aiDeployHandle}>
                Save and Deploy
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAi;
