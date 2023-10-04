import React, { useState } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Survey.module.css";
import images from "../../assets";
import { useGlobal } from "../../context/GlobalContext";
import { getCurrentProductId, surveyDeploy } from "../../api";
import { Grid } from '@mui/material';

const Survey = () => {
  const { productDataHandle, product_data } = useGlobal();

  const [answers, setAnswers] = useState();
  const [questions, setQuestions] = useState();

  const surveyDeplyHandle = async () => {
    const data = {
      survey: product_data.survey,
      answers,
      questions,
      product_id: getCurrentProductId()
    };
    await surveyDeploy(data);
  };

  const addQuestionHandle = async () => {
    let temp;
    if (questions) {
      temp = JSON.parse(questions);
      temp.push("");
    } else {
      temp = [""];
    }
    setQuestions(JSON.stringify(temp));
  };

  const changeQuestionHandle = async (e, index) => {
    let temp = JSON.parse(questions);
    temp[index] = e.target.value;
    setQuestions(JSON.stringify(temp));
  };

  const addAnswerHandle = async (index) => {
    if (answers) {
      let temp = JSON.parse(answers);
      if (temp[index]) {
        temp[index].push("");
      } else {
        temp[index] = [""];
      }
      setAnswers(JSON.stringify(temp));
    } else {
      setAnswers(JSON.stringify({ [index]: [""] }));
    }
  };

  const changeAnswerHandle = async (e, index, _index) => {
    try {
      let temp = JSON.parse(answers);
      temp[index][_index] = e.target.value;
      setAnswers(JSON.stringify(temp));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={Style.product_section}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={Style.product_post_section}>
              <h1>Add survey to Bump-me</h1>
              <div className={Style.product_post_input}>
                <div className={Style.product_file_input_box}>
                  <div
                    className={Style.product_file_input}
                    onClick={() => productDataHandle("survey", true)}
                  >
                    <Image
                      className={Style.circle}
                      src={images.circle}
                      alt="image"
                    />
                    <span>+</span>
                    <p>Add survey</p>
                  </div>

                  <div
                    className={Style.product_add_page}
                    onClick={() => {
                      addQuestionHandle();
                    }}
                  >
                    <span>+</span>
                    <p>Add question</p>
                  </div>
                </div>
                <div className={Style.product_add_question}>
                  {questions &&
                    JSON.parse(questions).map((item, index) => (
                      <React.Fragment key={index}>
                        <input
                          className={Style.product_add_question_number}
                          onChange={(e) => {
                            changeQuestionHandle(e, index);
                          }}
                          placeholder="question"
                          value={item}
                        />
                        <div
                          className={Style.product_add_question_icon}
                          onClick={() => {
                            addAnswerHandle(index);
                          }}
                        >
                          <span>+</span>
                          <p>Add answer</p>
                        </div>
                        {answers &&
                          JSON.parse(answers) &&
                          JSON.parse(answers)[index] &&
                          JSON.parse(answers)[index].map((_item, _index) => (
                            <React.Fragment key={_index}>
                              <input
                                className={Style.product_add_answer_number}
                                onChange={(e) => {
                                  changeAnswerHandle(e, index, _index);
                                }}
                                placeholder="answer"
                                value={_item}
                              />
                            </React.Fragment>
                          ))}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={Style.product_post_card_section}>
              <div className={Style.product_post_card_box}>
                <h1>Preview </h1>
                <div className={Style.product_post_card}>
                  <div className={Style.product_post_card_img_box}>
                    <Image
                      className={Style.c_v_ctrl_img}
                      src={images.c_v_ctrl}
                      alt="image"
                    />
                    <div className={Style.product_post_card_img_content}>
                      <button className={Style.buy_now_btn}>BUY NOW</button>
                      <h2>{product_data.product_name}</h2>
                      <p>{product_data.product_desc}</p>
                      <div className={Style.product_post_card_img_content_btn_one}>
                        <button>ADD TO CART</button>
                        <button>OPEN PAGE</button>
                      </div>
                      <div className={Style.product_post_card_img_content_btn_two}>
                        {product_data.website ? (
                          <button
                            onClick={() => window.open(product_data.link, "_blank")}
                          >
                            Website
                          </button>
                        ) : null}
                        {product_data.survey ? (
                          <button>Survey questions</button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className={Style.card_save_btn} onClick={surveyDeplyHandle}>
                    Save and Deploy
                  </div>
                </div>
                <p>
                  -Each Item is equivalent to one label or NFC. <br /> <br />
                  -When you post your item to Bump-me it is the item is tracked on
                  the blockchain and when the qr code isscanned and marked as sold
                  an nft will be minted as a receipt.
                </p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Survey;
