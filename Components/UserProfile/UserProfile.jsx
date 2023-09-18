import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./UserProfile.module.css";
import images from "../../assets";

const UserProfile = () => {
  return (
    <>
      <div className={Style.profile_section}>
        <div className={Style.profile_address_section}></div>
        <div className={Style.profile_img_section}>
          <Image
            className={Style.profile_img}
            src={images.profile_icon}
            alt="image"
          />
        </div>
      </div>

      <div className={Style.user_details_section}>
        <div className={Style.user_details_first}>
          <h1 className={Style.user_details_title}>YOUR NFTs</h1>
          <div className={Style.user_details_first_card}></div>
          <p>Genesis NFT - 1</p>
          <div className={Style.user_details_first_btn}>
            <h3>GET MORE</h3>
          </div>
        </div>

        <div className={Style.user_details_secound}>
          <h1 className={Style.user_details_title}>YOUR SHARE</h1>
          <div className={Style.user_details_secound_card}>
            <h1>$100k</h1>
            <p>Holder's Pool</p>
            <div className={Style.user_details_secound_card_bottom}>
              <div className={Style.user_details_secound_card_seekbar}>
                <div className={Style.user_details_secound_card_innerbar}></div>
              </div>
              <p>Ticket</p>
              <button className={Style.user_details_secound_card_bottom_button}>
                CLAIM
              </button>
            </div>
          </div>
          <p>CURRENT SHARE VALUE </p>
          <p>$1 USDC </p>
        </div>

        <div className={Style.user_details_third}>
          <h1 className={Style.user_details_title}>REFER A FRIEND</h1>
          <div className={Style.user_details_third_card}>
            <div className={Style.user_details_third_card_address}>
              <div className={Style.user_address}></div>
              <button className={Style.user_address_button}>Copy</button>
            </div>
            <div className={Style.user_refer_list}>
              <table class="two-column-table">
                <thead>
                  <tr>
                    <th class="left-column-title">REFERRALS</th>
                    <th class="right-column-title">TICKETS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="left-column">7HTB...yi5m</td>
                    <td class="right-column">1</td>
                  </tr>
                  <tr>
                    <td class="left-column">7HTB...yi5m</td>
                    <td class="right-column">2</td>
                  </tr>
                  <tr>
                    <td class="left-column">7HTB...yi5m</td>
                    <td class="right-column">3</td>
                  </tr>
                  <tr>
                    <td class="left-column">7HTB...yi5m</td>
                    <td class="right-column">1</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p>
            -FOR EACH FRIEND THAT BUYS A TICKET USING YOUR LINK YOU GET 1
            TICKET.
          </p>
          <p>
            -WHEN YOU PURCHASE A TICKET YOUR ENTRY WILL COUNT AS 1 TICKET X N OF
            UNCLAIMED TICKETS.
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
