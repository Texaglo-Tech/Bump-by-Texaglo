import React, {useState} from "react";
import { verifyOTP } from "../../api";

const VerificationInput = ({data, router}) => {
  const [code, setCode] = useState("");

  const handleVerify = async() => {
    if(code == "") return
    console.log(data)
    const code_data = {
      ...data,
      code: code
    }
    console.log(data)
    const res = await verifyOTP(code_data)
    if(res?.success){
      router.push("/dashboard");
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="wrapper_form">
          <h2>Verification Code</h2>

          <div className="input_field">
            <input type="number" required onChange={(e)=>setCode(e.target.value)}/>
            <label>Enter Verification Code</label>
          </div>

          <button onClick={handleVerify}>Confirm</button>
        </div>
      </div>
    </>
  );
};

export default VerificationInput;
