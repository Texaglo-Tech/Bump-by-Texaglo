import React from "react";

const VerificationInput = () => {
  return (
    <>
      <div className="wrapper">
        <form action="#" className="wrapper_form">
          <h2>Verification Code</h2>

          <div className="input_field">
            <input type="number" required />
            <label>Enter Verification Code</label>
          </div>

          <button type="submit">Confirm</button>
        </form>
      </div>
    </>
  );
};

export default VerificationInput;
