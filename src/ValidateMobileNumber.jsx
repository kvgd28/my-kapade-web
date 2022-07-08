import React, { useState } from "react";
import BookNow from "./BookNow";

async function sendOtp(mobileNumber) {
  return fetch(`https://booking-service-kdewilj24a-uc.a.run.app/sendotp`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: mobileNumber
  }).then((response) => {
    if (!response.ok)
      throw new Error(`Error while sending otp: ${response.status}`);
  });
}

async function validateOtp(mobileNumber, userOtp) {
  return fetch(
    `https://booking-service-kdewilj24a-uc.a.run.app/validateotp?mobileNumber=${mobileNumber}&userOtp=${userOtp}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Error while validating otp: ${response.status}`);
    else return response.json();
  });
}

function ValidateMobileNumber() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [userValidated, setUserValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wrongOtp, setWrongOtp] = useState(false);

  const handleMobileNumberSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendOtp(mobileNumber);
    setLoading(false);
    setOtpSent(true);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isOtpMatched = await validateOtp(mobileNumber, userOtp);
    setLoading(false);
    if (isOtpMatched) {
      setOtpSent(false);
      setWrongOtp(false);
      setUserValidated(true);
    } else {
      setWrongOtp(true);
    }
  };

  if (!userValidated) {
    return (
      <>
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-3  mx-auto pt-5">
              <form onSubmit={handleMobileNumberSubmit}>
                <div class="form-group">
                  <label className="form-label" for="mobileNumberInput">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobileNumberInput"
                    aria-describedby="mobileNumberHelp"
                    placeholder="Enter 10 digit mobile number"
                    pattern="[0-9]{10}"
                    title="Please enter a 10 digit number."
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                  <small id="mobileNumberHelp" class="form-text text-muted">
                    We'll never share your mobile number with anyone.
                  </small>
                </div>
                {!otpSent && (
                  <div>
                    <br />
                    <button type="submit" class="btn btn-primary pr-5">
                      Submit
                    </button>
                    {loading && <div class="spinner-border" role="status" />}
                  </div>
                )}
              </form>
              <form onSubmit={handleOtpSubmit}>
                {otpSent && (
                  <>
                    <br />
                    <div class="form-group">
                      <label className="form-label" for="userOtp">
                        OTP
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="userOtp"
                        placeholder="Enter OTP"
                        pattern="[0-9]{6}"
                        title="Please enter the 6 digit OTP."
                        onChange={(e) => setUserOtp(e.target.value)}
                      />
                    </div>
                    {wrongOtp && (
                      <div style={{ color: "red" }}>
                        OTP entered is wrong. Please check.
                      </div>
                    )}
                    <>
                      <br />
                      <button type="submit" class="btn btn-primary pr-5">
                        Submit
                      </button>
                      {loading && <div class="spinner-border" role="status" />}
                    </>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <BookNow mobileNumber={mobileNumber} userValidated={userValidated} />
    );
  }
}

export default ValidateMobileNumber;
