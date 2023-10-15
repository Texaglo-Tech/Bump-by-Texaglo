import { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Image from "next/image";
import axios from "axios";
import { IoPaperPlaneSharp, IoMic, IoMicOff } from "react-icons/io5";

//INTERNAL IMPORT
import images from "../../assets";

const AiBot = () => {
  const [openChat, setOpenChat] = useState(false);
  const [isOpenMic, setIsOpenMic] = useState(false);
  const [isAiRespond, setIsAiRespond] = useState(true);
  const [aiInputText, setAiInputText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const { transcript, resetTranscript, startListening, stopListening } =
    useSpeechRecognition();

  const HandleStartListening = () => {
    setIsOpenMic(true);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };
  const HandleStopListening = () => {
    setIsOpenMic(false);
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  const handleSentAI = async (aiInputText) => {
    setIsAiRespond(false);
    const res = await axios.post("http://localhost:80/aiResponse", {
      msg: aiInputText,
      url: "",
    });
    setAiResponse(res.data.response);

    const botMessage = res.data.response;
    setChat([...chat, { user: message, bot: botMessage }]);
    const utterance = new SpeechSynthesisUtterance(botMessage);
    speechSynthesis.speak(utterance);

    if (res.data.response) {
      console.log("worked");
      setIsAiRespond(true);
    }
    setMessage("");
    console.log(res.data.response);
  };

  const handleInputText = (e) => {
    setAiInputText(e.target.value);
  };

  // useEffect(() => {
  //   if ("speechSynthesis" in window) {
  //     setSynthesis(window.speechSynthesis);
  //   }
  // }, []);

  console.log(message);
  useEffect(() => {
    if (transcript && isAiRespond) {
      setMessage(transcript);
    }
  }, [transcript, isAiRespond]);

  useEffect(() => {
    let timeoutId;

    const handleChange = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (message) {
          resetTranscript();
          setMessage("");
          handleSentAI(message);
        }
        console.log("Value remained unchanged for 10 seconds:", message);
      }, 3000); // 3 seconds in milliseconds
    };

    if (message) {
      handleChange();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <>
      {openChat && (
        <div class="chat-box">
          <div class="chat-box-header">
            <h3>Talk With AI</h3>
            <p>
              <i class="fa fa-times"></i>
            </p>
          </div>
          <div class="chat-box-body">
            {chat.map((entry, index) => (
              <div key={index}>
                <div class="chat-box-body-receive">
                  <p>User: {entry.user}</p>
                </div>
                <div class="chat-box-body-send">
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
          <div class="chat-box-footer">
            <input
              placeholder="Enter Your Message"
              type="text"
              onChange={handleInputText}
              value={message}
            />
            <IoPaperPlaneSharp
              className="chatbob_icon"
              onClick={() => {
                handleSentAI(aiInputText);
              }}
            />
            {isOpenMic ? (
              <IoMicOff
                className="chatbob_icon"
                onClick={HandleStopListening}
              />
            ) : (
              <IoMic className="chatbob_icon" onClick={HandleStartListening} />
            )}
          </div>
        </div>
      )}

      {!openChat ? (
        <div class="chat-button" onClick={() => setOpenChat(true)}>
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
        <div class="chat-button" onClick={() => setOpenChat(false)}>
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
