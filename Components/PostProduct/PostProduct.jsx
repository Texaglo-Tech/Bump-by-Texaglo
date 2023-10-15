import React, { useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./PostProduct.module.css";
import images from "../../assets";
import { useState, useRef } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

import { createOrder, getUserIdFromToken, updateQuantity } from "../../api";
import { useGlobal } from "../../context/GlobalContext";
import { Grid } from "@mui/material";
import { useWallet } from "@solana/wallet-adapter-react";

const htmlToImage = require("html-to-image");
const config = require("../../config.json");

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

const PostProduct = () => {
  const { publicKey } = useWallet();
  const fileInputRef = useRef(null);
  const { productDataHandle, product_data, editProduct, editProductHandle } =
    useGlobal();

  const [file, setFile] = useState(null);
  const [product_id, setProductId] = useState(null);
  const [qrcode_value, setQrcodeValue] = useState("");

  const orderCreateHandle = async () => {
    if (!publicKey) {
      toast.warning("Please connect the wallet", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (product_data.product_name == "") {
      toast.warning("Please input product name", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (product_data.product_cost == "") {
      toast.warning("Please input the cost", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (product_data.product_desc == "") {
      toast.warning("Please input the description", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (!file) {
      toast.warning("Please select the file", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_name", product_data.product_name);
    formData.append("product_cost", product_data.product_cost);
    formData.append("product_desc", product_data.product_desc);
    formData.append("product_type", product_data.product_type);
    formData.append("product_link", product_data.product_link);
    formData.append("product_payment", product_data.product_payment);
    formData.append("product_qrcode", product_data.product_qrcode);
    formData.append("wallet", publicKey.toBase58());
    formData.append("user_id", getUserIdFromToken());
    formData.append("edit", false);

    console.log(product_data);
    console.log(formData);

    const res = await createOrder(formData);
    setQrcodeValue();
    if (res.success) {
      console.log(res.data);
      console.log("created product id is ", res.data.product_id);
      localStorage.setItem("product_id", res.data.product_id);
      setProductId(res.data.product_id);
    }
  };

  
  const orderEditHandle = async () => {
    if (!publicKey) {
      toast.warning("Please connect the wallet", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (product_data.product_name == "") {
      toast.warning("Please input product name", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (product_data.product_cost == "") {
      toast.warning("Please input the cost", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (product_data.product_desc == "") {
      toast.warning("Please input the description", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }
    if (!file) {
      toast.warning("Please select the file", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("product_name", product_data.product_name);
    formData.append("product_cost", product_data.product_cost);
    formData.append("product_desc", product_data.product_desc);
    formData.append("product_type", product_data.product_type);
    formData.append("product_link", product_data.product_link);
    formData.append("product_payment", product_data.product_payment);
    formData.append("product_qrcode", product_data.product_qrcode);
    formData.append("wallet", publicKey.toBase58());
    formData.append("user_id", getUserIdFromToken());
    formData.append("edit", true);
    formData.append("product_id", product_data.product_id);

    console.log(product_data);
    console.log(formData);

    const res = await createOrder(formData);
    setQrcodeValue();
    if (res.success) {
      console.log(res.data);
      console.log("created product id is ", res.data.product_id);
      localStorage.setItem("product_id", res.data.product_id);
      setProductId(res.data.product_id);
    }
  };

  const addFile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    productDataHandle("product_file", URL.createObjectURL(selectedFile));
  };

  const createQuantityAndDownload = async () => {
    if (!product_id) {
      toast.warning("Please create the product first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    setQrcodeValue(`${config.frontend_url}/product/${product_id}`);

    const formData = {
      product_id,
      quantity: product_data.quantity,
      edit: false
    };

    console.log("formData-> ", formData);

    const res = await updateQuantity(formData);

    if (res.success && product_data.product_link != "nfc") {
      exportPNG(
        document.querySelector("svg"),
        `${product_data.product_name}_qrcode.png`
      );
    }

    if (res.success && product_data.product_link == "nfc") {
      const qrCodeSvg = document.getElementById("nfc");
      exportPNG(
        document.getElementById("nfc"),
        `${product_data.product_name}_nfc.png`
      );
    }
  };

  const editQuantityAndDownload = async () => {
    if (!editProduct) {
      toast.warning("Please create the product first", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
      return;
    }

    setQrcodeValue(`${config.frontend_url}/product/${product_data?.product_id}`);

    const formData = {
      product_id: product_data?.product_id,
      quantity: product_data.quantity,
      edit: true
    };

    console.log("formData-> ", formData);

    const res = await updateQuantity(formData);

    if (res.success && product_data.product_link != "nfc") {
      exportPNG(
        document.querySelector("svg"),
        `${product_data.product_name}_qrcode.png`
      );
    }

    if (res.success && product_data.product_link == "nfc") {
      const qrCodeSvg = document.getElementById("nfc");
      exportPNG(
        document.getElementById("nfc"),
        `${product_data.product_name}_nfc.png`
      );
    }
  };

  const exportPNG = (dom, file_name) => {
    htmlToImage
      .toPng(dom)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = file_name;
        link.click();
      })
      .catch((error) => {
        console.error("Error while converting SVG to PNG:", error);
      });
  };


  useEffect(()=>{
    console.log(product_data)
  }, [product_data])

  return (
    <>
      <div className={Style.product_section}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} sx={{ padding: "30px" }}>
            <div className={Style.product_post_section}>
              <h1>Post a product to Bump-me</h1>
              <div className={Style.product_post_input}>
                <div className={Style.product_data_input}>
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
                          productDataHandle(
                            "product_type",
                            product_data.product_type == "local"
                              ? "digital"
                              : "local"
                          );
                        }}
                        checked={product_data?.product_qrcode == "local"? true: false}
                        inputProps={{ "aria-label": "ant design" }}
                      />

                      <div
                        style={{
                          marginLeft: "-15px",
                          marginTop: "-5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <label
                          style={{ fontSize: "17px", color: "white" }}
                          onClick={() => {
                            productDataHandle("product_type", "local");
                          }}
                        >
                          local product
                        </label>
                        <span style={{ height: "10px" }}></span>
                        <label
                          style={{ fontSize: "17px", color: "white" }}
                          onClick={() => {
                            productDataHandle("product_type", "digital");
                          }}
                        >
                          Digital product
                        </label>
                      </div>
                      <div
                        className={Style.product_file_input}
                        onClick={() => fileInputRef.current.click()}
                        onChange={addFile}
                      >
                        <input
                          type="file"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                        <Image
                          className={Style.circle}
                          src={images.circle}
                          alt="image"
                        />
                        <span>+</span>
                        <p>Add image</p>
                      </div>
                    </div>
                  </div>

                  <p>I want my product to be :</p>

                  <div className={Style.content_input}>
                    <label htmlFor="">named:</label>
                    <input
                      type="text"
                      value={product_data?.product_name}
                      onChange={(e) => {
                        productDataHandle("product_name", e.target.value);
                      }}
                    />
                  </div>
                  <div className={Style.content_input}>
                    <label htmlFor="">cost:</label>
                    <input
                      type="text"
                      value={product_data?.product_cost}
                      onChange={(e) => {
                        productDataHandle("product_cost", e.target.value);
                      }}
                    />
                  </div>
                  <div className={Style.content_input}>
                    <label htmlFor="">Described: </label>
                    <textarea
                      id="w3review"
                      name="w3review"
                      rows="4"
                      cols="50"
                      value={product_data?.product_des}
                      onChange={(e) => {
                        productDataHandle("product_desc", e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className={Style.product_post_options_btn}>
                <div className={Style.product_post_toggle}>
                  <div className={Style.toggle_switch_container}>
                    <label
                      htmlFor=""
                      className={Style.product_post_toggle_title}
                    >
                      Link Method:
                    </label>

                    <div
                      style={{
                        display: "flex",
                        marginLeft: "-25px",
                        marginTop: "25px",
                      }}
                    >
                      <AntSwitch
                        onChange={() =>
                          productDataHandle(
                            "product_link",
                            product_data.product_link == "nfc"
                              ? "qrcode"
                              : "nfc"
                          )
                        }
                        checked={product_data?.product_qrcode == "nfc"? true: false}
                        inputProps={{ "aria-label": "ant design" }}
                      />

                      <div
                        style={{
                          marginLeft: "-15px",
                          marginTop: "-5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <label style={{ fontSize: "17px", color: "white" }}>
                          NFC
                        </label>
                        <span style={{ height: "10px" }}></span>
                        <label style={{ fontSize: "17px", color: "white" }}>
                          QR Code
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={Style.product_post_toggle}>
                  <div className={Style.toggle_switch_container}>
                    <label
                      htmlFor=""
                      className={Style.product_post_toggle_title}
                    >
                      Payement type:
                    </label>
                    <div
                      style={{
                        display: "flex",
                        marginLeft: "-25px",
                        marginTop: "25px",
                      }}
                    >
                      <AntSwitch
                        onChange={(e) => {
                          productDataHandle(
                            "product_payment",
                            product_data.product_payment == "dollar"
                              ? "crypto"
                              : "dollar"
                          );
                        }}
                        checked={product_data?.product_qrcode == "dollar"? true: false}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                      <div
                        style={{
                          marginLeft: "-15px",
                          marginTop: "-5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <label style={{ fontSize: "17px", color: "white" }}>
                          Dollars
                        </label>
                        <span style={{ height: "10px" }}></span>
                        <label style={{ fontSize: "17px", color: "white" }}>
                          Crypto
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {product_data.product_link == "nfc" ? (
                  <></>
                ) : (
                  <div className={Style.product_post_toggle}>
                    <div className={Style.toggle_switch_container}>
                      <label
                        className={Style.product_post_toggle_title}
                        htmlFor=""
                      >
                        Qr Code Type:
                      </label>

                      <div
                        style={{
                          display: "flex",
                          marginLeft: "-25px",
                          marginTop: "25px",
                        }}
                      >
                        <AntSwitch
                          onChange={(e) => {
                            productDataHandle(
                              "product_qrcode",
                              product_data.product_qrcode == "physical"
                                ? "digital"
                                : "physical"
                            );
                          }}
                          checked={product_data?.product_qrcode == "physical"? true: false}
                          inputProps={{ "aria-label": "ant design" }}
                        />
                        <div
                          style={{
                            marginLeft: "-15px",
                            marginTop: "-5px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <label style={{ fontSize: "17px", color: "white" }}>
                            Physical
                          </label>
                          <span style={{ height: "10px" }}></span>
                          <label style={{ fontSize: "17px", color: "white" }}>
                            Digital
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {editProduct? (
                <div
                  className={Style.product_order_btn}
                  onClick={orderEditHandle}
                >
                  Order qr And Edit Product
                </div>
              ) : (
                <div
                  className={Style.product_order_btn}
                  onClick={orderCreateHandle}
                >
                  Order qr And Create Product
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={Style.product_post_card_section}>
              <div className={Style.product_post_card_box}>
                <h1>
                  {product_data.product_link == "nfc" ? (
                    <>NFC Label</>
                  ) : (
                    <>Qr Code</>
                  )}
                </h1>
                <div className={Style.product_post_card}>
                  <h1 className={Style.product_post_card_title}>Cost: $0</h1>
                  <div className={Style.product_post_card_img_box}>
                    {product_data.product_link == "nfc" ? (
                      <Image src={images.nfc} alt="image" id="nfc" />
                    ) : (
                      <QRCode
                        size={150}
                        style={{
                          height: "auto",
                          maxWidth: "50%",
                          width: "50%",
                        }}
                        value={`${qrcode_value}`}
                        viewBox={`0 0 150 150`}
                      />
                    )}
                  </div>

                  <div className={Style.product_card_btn_box}>
                    <button>Order labels</button>
                    <input
                      placeholder="quantity"
                      type="number"
                      value={product_data?.quantity}
                      onChange={(e) =>
                        productDataHandle("quantity", e.target.value)
                      }
                    />
                  </div>
                  {editProduct? (
                    <div
                      className={Style.product_card_download_btn}
                      onClick={editQuantityAndDownload}
                    >
                      Edit and Download
                    </div>
                  ) : (
                    <div
                      className={Style.product_card_download_btn}
                      onClick={createQuantityAndDownload}
                    >
                      Create and Download
                    </div>
                  )}
                </div>
                <p>
                  -Each Item is equivalent to one label or NFC. <br /> <br />
                  -When you post your item to Bump-me it is the item is tracked
                  on the blockchain and when the qr code isscanned and marked as
                  sold an nft will be minted as a receipt.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PostProduct;
