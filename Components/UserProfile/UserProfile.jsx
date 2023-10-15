import React, { useEffect, useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./UserProfile.module.css";
import images from "../../assets";
import NavProfile from "../NavProfile/NavProfile";
import { Connection } from "@solana/web3.js";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import { getRefer, getUserIdFromToken } from "../../api";
import { toast } from "react-toastify";

const config = require("./../../config.json");

const UserProfile = () => {
  const { publicKey } = useWallet();
  const [nft_count, setNFTCount] = useState(0);
  const [refer, setRefer] = useState([]);
  const [refer_link, setReferLink] = useState("");

  const fetchWalletForNFTs = async (address) => {
    const connection = new Connection(config.mainnetRPC, "confirmed");
    const nftAccounts = await getParsedNftAccountsByOwner({
      publicAddress: address,
      connection: connection,
    });
    let nftCount = 0;
    for (let i = 0; i < nftAccounts.length; i++) {
      if (
        nftAccounts[i].updateAuthority ==
        "HE53BkXg7GNnLpTpuqKC5paMXkpHpZD2PrbHT3SP3aj2"
      ) {
        nftCount++;
        continue;
      }
    }
    setNFTCount(nft_count);
  };

  useEffect(() => {
    if (publicKey) {
      fetchWalletForNFTs(publicKey);
    }
  }, [publicKey]);

  useEffect(() => {
    console.log("get reffer");
    if (getUserIdFromToken()) {
      setReferLink(`${config.frontend_url}/refer/${getUserIdFromToken()}`);

      const data = {
        user_id: getUserIdFromToken(),
      };
      getRefer(data).then((data) => {
        if (data.success) {
          setRefer(data.data);
        }
      });
    }
  }, []);

  const copyHandle = () => {
    navigator.clipboard.writeText(
      `${config.frontend_url}/refer/${getUserIdFromToken()}`
    );
    toast.success("Successfully copied", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <>
      <NavProfile />

      <div className={Style.user_details_section}>
        <div className={Style.user_details_first}>
          <h1 className={Style.user_details_title}>YOUR NFTs</h1>
          <div className={Style.user_details_first_card}></div>
          <p>Genesis NFT - {nft_count}</p>
          <div
            className={Style.user_details_first_btn}
            onClick={() => window.open("https://daofolk.texaglo.com", "_blank")}
          >
            <h3>GET MORE</h3>
          </div>
        </div>

        {/* <div className={Style.user_details_secound}>
          <h1 className={Style.user_details_title}>YOUR SHARE</h1>
          <div className={Style.user_details_secound_card}>
            <h1>$100k</h1>
            <p>{"Holder's Pool"}</p>
            <div className={Style.user_details_secound_card_bottom}>
              <div className={Style.user_details_secound_card_seekbar}>
                <div className={Style.user_details_secound_card_innerbar}></div>
              </div>
              <p>POINT</p>
              <button className={Style.user_details_secound_card_bottom_button}>
                CLAIM
              </button>
            </div>
          </div>
          <p>CURRENT SHARE VALUE </p>
          <p>$1 USDC </p>
        </div> */}

        <div className={Style.user_details_third}>
          <h1 className={Style.user_details_title}>REFER A FRIEND</h1>
          <div className={Style.user_details_third_card}>
            <div className={Style.user_details_third_card_address}>
              <div className={Style.user_address}>{refer_link}</div>
              <button
                className={Style.user_address_button}
                onClick={copyHandle}
              >
                Copy
              </button>
            </div>
            <div className={Style.user_refer_list}>
              <table className="two-column-table">
                <thead>
                  <tr>
                    <th className="left-column-title">REFERRALS</th>
                    <th className="right-column-title">POINTS</th>
                  </tr>
                </thead>
                <tbody>
                  {refer.map((item, index) => (
                    <tr key={index}>
                      <td className="left-column">{item.name}</td>
                      <td className="right-column">20</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p>
            -FOR EACH FRIEND THAT BUYS A POINT USING YOUR LINK YOU GET 1 POINT.
          </p>
          <p>
            -WHEN YOU PURCHASE A POINT YOUR ENTRY WILL COUNT AS 1 POINT X N OF
            UNCLAIMED POINTS.
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
