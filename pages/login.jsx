import React, { useState } from "react";
import LogInSection from "../Components/LogInSection/LogInSection";
import ForgetPasswordSection from "../Components/ForgetPasswordSection/ForgetPasswordSection";

const Login = () => {
  const [loginComp, setLoginComp] = useState(true);

  return (
    <div className="login_page">
      <div className="login_page_bump">
        Bump me
      </div>
      <div>
        {loginComp ? (
          <LogInSection setLoginComp={setLoginComp} />
        ) : (
          <ForgetPasswordSection setLoginComp={setLoginComp} />
        )}
      </div>
    </div>
  );
};

export default Login;
