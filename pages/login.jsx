import React, { useState } from "react";
import LogInSection from "../Components/LogInSection/LogInSection";
import ForgetPasswordSection from "../Components/ForgetPasswordSection/ForgetPasswordSection";
import { Grid } from "@mui/material";

const Login = () => {
  const [loginComp, setLoginComp] = useState(true);

  return (
    <div className="login_page">
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="login_page_bump">Bump me</div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div>
            {loginComp ? (
              <LogInSection setLoginComp={setLoginComp} />
            ) : (
              <ForgetPasswordSection setLoginComp={setLoginComp} />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
