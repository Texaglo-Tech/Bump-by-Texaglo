import React, { useState } from "react";
import SignUpSection from "../components/SignUpSection";

const Signup = () => {

  return (
    <div className="login_page">
      <div className="login_page_bump">
        Bump me
      </div>
      <div>
          <SignUpSection />
      </div>
    </div>
  );
};

export default Signup;
