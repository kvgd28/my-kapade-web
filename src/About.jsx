import React from "react";
import BookingStatus from "./BookingStatus";
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
      <BookingStatus isSuccess="true" />
    </>
  );
}

export default About;
