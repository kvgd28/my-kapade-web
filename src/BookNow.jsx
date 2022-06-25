import React from "react";
import SelectAddress from "./SelectAddress";
import SelectSlot from "./SelectSlot";
import ValidateMobileNumber from "./ValidateMobileNumber";

function BookNow(props) {
  const userValidated = props?.userValidated;
  const mobileNumber = props?.mobileNumber;
  const addressSelected = props?.addressSelected;
  const address = props?.address;

  if (!userValidated) {
    return <ValidateMobileNumber />;
  }

  if (userValidated && !addressSelected) {
    return <SelectAddress mobileNumber={mobileNumber} />;
  }

  if (userValidated && addressSelected) {
    return <SelectSlot mobileNumber={mobileNumber} address={address} />;
  }
}

export default BookNow;
