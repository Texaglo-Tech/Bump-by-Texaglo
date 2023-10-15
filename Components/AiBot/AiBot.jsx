import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { IoPaperPlaneSharp, IoMic, IoMicOff } from "react-icons/io5";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"; // Updated import
import { useSpeechSynthesis } from "react-speech-kit";

//INTERNAL IMPORT
import images from "../../assets";
import { aiChat } from "../../api";
const config = require("./../../config.json");

const AiBot = () => {
  const { speak } = useSpeechSynthesis();
  const { transcript, resetTranscript, startListening, stopListening } =
    useSpeechRecognition();
  const [openChat, setOpenChat] = useState(false);
  const [isOpenMic, setIsOpenMic] = useState(false);
  const [isAiRespond, setIsAiRespond] = useState(true);
  const [aiInputText, setAiInputText] = useState("");
  const [chat, setChat] = useState([]);

  const handleSentAI = async (aiInputText, type) => {
    setIsAiRespond(false);
    const data = {
      msg: type == "voice" ? transcript : aiInputText,
      type: config.ai_type,
      product_id: "technoking",
    };
    setChat([
      ...chat,
      { user: type == "voice" ? transcript : aiInputText, bot: "plz wait..." },
    ]);

    const res = await aiChat(data);
    if (!res.success) {
      setChat([
        ...chat,
        {
          user: type == "voice" ? transcript : aiInputText,
          bot: "Please try again",
        },
      ]);
    } else {
      console.log(res.data);
      setIsAiRespond(true);
      setChat([
        ...chat,
        {
          user: type == "voice" ? transcript : `${aiInputText}`,
          bot: `${res.data}`,
        },
      ]);
      speak({ text: res.data });
    }
    setAiInputText("");
  };

  const handleInputText = (e) => {
    setAiInputText(e.target.value);
  };

  useEffect(() => {
    console.log(transcript);
    if (transcript && isOpenMic) {
      console.log("awesome, this is voice recoding script: ", transcript);
      handleSentAI(transcript, "voice");
    }
  }, [transcript, isOpenMic]);

  useEffect(() => {
    speechSynthesis.cancel();
  }, []);

  const handleVoiceStart = () => {
    try {
      setIsOpenMic(true);
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleVoiceStop = () => {
    try {
      setIsOpenMic(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    } catch (err) {
      console.log(err);
    }
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
            {chat.map((entry, index) => (
              <div key={index}>
                <div className="chat-box-body-receive">
                  <p>You: {entry.user}</p>
                </div>
                <div className="chat-box-body-send">
                  <p>Bot: {entry.bot}</p>
                </div>
              </div>
            ))}

            {!isAiRespond && (
              <div class="chat-box-body-send">
                <div class="bouncing-loader">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            )}

            {isOpenMic && (
              <div class="soundWave">
                <div class="boxContainer">
                  <div class="box box1"></div>
                  <div class="box box2"></div>
                  <div class="box box3"></div>
                  <div class="box box4"></div>
                  <div class="box box5"></div>
                </div>
              </div>
            )}
          </div>
          <div className="chat-box-footer">
            <input
              placeholder="Enter Your Message"
              type="text"
              value={aiInputText}
              onChange={handleInputText}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSentAI(aiInputText, "text");
                }
              }}
            />
            <IoPaperPlaneSharp
              className="chatbob_icon"
              onClick={() => {
                handleSentAI(aiInputText, "text");
              }}
            />
            {isOpenMic ? (
              <IoMicOff className="chatbob_icon" onClick={handleVoiceStop} />
            ) : (
              <IoMic className="chatbob_icon" onClick={handleVoiceStart} />
            )}
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
