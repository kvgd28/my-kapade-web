import React from "react";
import SelectSlot from "./SelectSlot";

function About() {
  const address = {
    name: "gangadhar",
    primaryAddressLine: "vinayaka layout",
    secondaryAddressLine: "Kamakshipalya",
    landmark: "traffic police station",
    city: "bangalore",
    state: "karnataka",
    pincode: 560079
  };
  return (
    <>
      <SelectSlot mobileNumber="8639955673" address={JSON.stringify(address)} />
    </>
  );
}

export default About;
