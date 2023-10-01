import React, { useState } from "react";
import { signupHandle } from "../../api";

const SignUpSection = ({ setLoginComp }) => {
  const [data, setData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signupHandle(data);

    if(res?.success){
      setLoginComp(true);
    }

  };

  console.log(data);
  return (
    <>
      <div className="wrapper">
        <form className="wrapper_form" onSubmit={handleSubmit}>
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
