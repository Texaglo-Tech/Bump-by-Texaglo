import React, { useState } from "react";
import LogInSection from "../Components/LogInSection/LogInSection";
import SignUpSection from "../Components/SignUpSection/SignUpSection";

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
          <SignUpSection setLoginComp={setLoginComp} />
        )}
      </div>
    </div>
  );
};

export default Login;
