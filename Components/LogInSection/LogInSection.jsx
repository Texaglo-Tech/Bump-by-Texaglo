import React, { useState } from "react";
import { useRouter } from "next/router";
import VerificationInput from "../VerificationInput/VerificationInput";

import { signinHandle, sentOTP, getCookie } from "../../api";

const LogInSection = ({ setLoginComp }) => {
  const [checked, setChecked] = useState(false);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    option: "phone",
    phone: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.option == "phone"){
      if (data.phone == ""){
        return;
      }
      const res = await sentOTP(data)
      if(res?.success){
        setIsCodeSend(true)
      }

    }else{
      const res = await signinHandle(data);
      if (res?.success) {
        router.push("/dashboard");
      }
    }
  };

  return (
    <>
      {!isCodeSend ? (
        <div className="wrapper">
          <form action="#" className="wrapper_form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div class="checkbox-wrapper-35">
              <input
                value="private"
                name="switch"
                id="switch"
                type="checkbox"
                class="switch"
                onChange={() => {
                  if (checked) setData({ ...data, option: "phone" });
                  else setData({ ...data, option: "email" });
                  setChecked(!checked);
                }}
              />
              <label for="switch">
                <span class="switch-x-text">Login with </span>
                <span class="switch-x-toggletext">
                  <span class="switch-x-unchecked">
                    <span class="switch-x-hiddenlabel">Unchecked: </span>
                    number
                  </span>
                  <span class="switch-x-checked">
                    <span class="switch-x-hiddenlabel">Checked: </span> email
                  </span>
                </span>
              </label>
            </div>
            {checked ? (
              <div className="input_field">
                <input
                  type="text"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
                <label>Enter your email</label>
              </div>
            ) : (
              <div className="input_field">
                <input
                  onChange={(e) => setData({ ...data, phone: e.target.value })}
                  required
                />
                <label>Enter your number</label>
              </div>
            )}

            {checked && (
              <>
                <div className="input_field">
                  <input
                    type="password"
                    required
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <label>Enter your password</label>
                </div>
                <div className="forget">
                  <label for="remember">
                    <input type="checkbox" id="remember" />
                    <p>Remember me</p>
                  </label>
                  <a href="#">Forgot password?</a>
                </div>
              </>
            )}

            <button type="submit">
              Log In
            </button>
            <div className="register">
              <p>
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={() => {
                    setLoginComp(false);
                  }}
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <VerificationInput data = {data} router={router}/>
      )}
    </>
  );
};

export default LogInSection;
