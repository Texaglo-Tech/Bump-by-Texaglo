import React from "react";

const LogInSection = ({ setLoginComp }) => {
  return (
    <>
      <div className="wrapper">
        <form action="#" className="wrapper_form">
          <h2>Login</h2>
          <div className="input_field">
            <input type="text" required />
            <label>Enter your email</label>
          </div>
          <div className="input_field">
            <input type="password" required />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <label for="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Log In</button>
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
    </>
  );
};

export default LogInSection;
