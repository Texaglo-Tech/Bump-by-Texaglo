import React, { useState } from "react";
import { useRouter } from "next/router";
import VerificationInput from "../VerificationInput/VerificationInput";
import axios from "axios";

const LogInSection = ({ setLoginComp }) => {
  const [checked, setChecked] = useState(true);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/login",
        data
        // {
        //   withCredentials: true,
        // }
      );
      console.log("Response:", response.data);
      if (response.data == "OK") {
        console.log("Worked");
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(checked);

  const handleOTP = () => {
    if (!checked) {
      setIsCodeSend(true);
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
                onChange={() => setChecked(!checked)}
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
                <input type="number" required />
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

            <button type="submit" onClick={handleOTP}>
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
        <VerificationInput />
      )}
    </>
  );
};

export default LogInSection;
