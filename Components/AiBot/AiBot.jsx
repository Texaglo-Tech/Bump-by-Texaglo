import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { IoPaperPlaneSharp, IoMic, IoMicOff } from "react-icons/io5";

//INTERNAL IMPORT
import images from "../../assets";

const AiBot = () => {
  const [openChat, setOpenChat] = useState(false);
  const [isOpenMic, setIsOpenMic] = useState(false);
  const [aiInputText, setAiInputText] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSentAI = async (aiInputText) => {
    const res = await axios.post("http://localhost:80/aiResponse", {
      msg: aiInputText,
      url: "",
    });
    setAiResponse(res.data.response);
    console.log(res.data.response);
  };

  const handleInputText = (e) => {
    setAiInputText(e.target.value);
  };

  return (
    <>
      {openChat && (
        <div className="chat-box">
          <div className="chat-box-header">
            <h3>Talk With AI</h3>
            <p>
              <i className="fa fa-times"></i>
            </p>
          </div>
          <div className="chat-box-body">
            <div className="chat-box-body-receive">
              {/* <p>{aiInputText}</p> */}
            </div>
            <div className="chat-box-body-send">
              <p>{aiResponse}</p>
            </div>
          </div>
          <div className="chat-box-footer">
            <input
              placeholder="Enter Your Message"
              type="text"
              onChange={handleInputText}
            />
            <IoPaperPlaneSharp
              className="chatbob_icon"
              onClick={() => {
                handleSentAI(aiInputText);
              }}
            />
            {/* {isOpenMic ? (
              <IoMicOff className="chatbob_icon" onClick={stopListening} />
            ) : (
              <IoMic className="chatbob_icon" onClick={startListening} />
            )} */}
          </div>
        </div>
      )}

      {!openChat ? (
        <div className="chat-button" onClick={() => setOpenChat(true)}>
          <Image
            src={images.botAI}
            alt="ai"
            width={50}
            height={50}
            // quality={100}
          />
          <span></span>
        </div>
      ) : (
        <div className="chat-button" onClick={() => setOpenChat(false)}>
          <Image
            src={images.close}
            alt="ai"
            width={50}
            height={50}
            // quality={100}
          />
        </div>
      )}
    </>
  );
};

export default AiBot;
