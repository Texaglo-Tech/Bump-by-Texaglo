import React from "react";

const SignUpSection = ({ setLoginComp }) => {
  return (
    <>
      <div className="wrapper">
        <form action="#" className="wrapper_form">
          <h2>Sign Up</h2>
          <div className="input_field">
            <input type="text" required />
            <label>Enter your user name</label>
          </div>

          <div className="input_field">
            <input type="number" required />
            <label>Enter your number</label>
          </div>
          <div className="input_field">
            <input type="text" required />
            <label>Enter your email</label>
          </div>
          <div className="input_field">
            <input type="password" required />
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
