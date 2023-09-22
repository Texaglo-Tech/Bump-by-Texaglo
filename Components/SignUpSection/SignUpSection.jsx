import React, { useState } from "react";
import axios from "axios";

const SignUpSection = ({ setLoginComp }) => {
  const [data, setData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3002/api/auth/register",
        data
        // {
        //   withCredentials: true,
        // }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(data);
  return (
    <>
      <div className="wrapper">
        <form action="#" className="wrapper_form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="input_field">
            <input
              type="text"
              required
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />
            <label>Enter your user name</label>
          </div>

          <div className="input_field">
            <input
              type="text"
              required
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <label>Enter your number</label>
          </div>
          <div className="input_field">
            <input
              type="text"
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label>Enter your email</label>
          </div>
          <div className="input_field">
            <input
              type="password"
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <label>Enter your password</label>
          </div>

          <button type="submit">Sign Up</button>
          <div className="register">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => {
                  setLoginComp(true);
                }}
              >
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpSection;
