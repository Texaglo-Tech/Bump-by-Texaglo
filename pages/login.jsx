import React, { useState } from "react";
import LogInSection from "../Components/LogInSection/LogInSection";
import SignUpSection from "../Components/SignUpSection/SignUpSection";

const login = () => {
  const [loginComp, setLoginComp] = useState(true);

  return (
    <div className="login_page">
      {loginComp ? (
        <LogInSection setLoginComp={setLoginComp} />
      ) : (
        <SignUpSection setLoginComp={setLoginComp} />
      )}
    </div>
  );
};

export default login;
