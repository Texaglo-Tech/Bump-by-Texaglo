import React, { useState, useEffect } from "react";
import { signupHandle } from "../../api";
import { useRouter } from "next/router";
const SignUpSection = () => {
  const router = useRouter();
  const [data, setData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    refer_id: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form_data = {
      ...data,
      phone: data.phone.replace(/\s+/g, '')
    }

    const res = await signupHandle(form_data);

    if(res?.success){
      router.push("/login")
      localStorage.removeItem("refer_id")
    }

  };

  useEffect(()=>{
    setData({ ...data, refer_id: localStorage.getItem("refer_id") })
    console.log(data);
  }, [])

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
                onClick={() => {
                  router.push("/login")
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
