import React, { useState } from "react";
import { useRouter } from "next/router";

import { forgotPassword } from "../../api";

const ForgetPasswordSection = ({ setLoginComp }) => {
  const [data, setData] = useState({
    mail: "",
    sent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.mail == "") {
      return;
    }
    const res = await forgotPassword(data);
    if (res?.success) {
      setData({ ...data, sent: true });
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="wrapper_form">
          <h2>Forgot Password</h2>
          {data.sent ? (
            <h3> Please check your email</h3>
          ) : (
            <div className="input_field">
              <input
                onChange={(e) => setData({ ...data, mail: e.target.value })}
                required
              />
              <label>Enter your mail</label>
            </div>
          )}
          {data.sent ? null : <button onClick={handleSubmit}>Confirm</button>}
          <div className="register">
            <p>
              <a
                onClick={() => {
                  setLoginComp(true);
                }}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPasswordSection;
