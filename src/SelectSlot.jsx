import React from "react";
import { NavLink } from "react-router-dom";
import SelectAddress from "./SelectAddress";

function SelectSlot(props) {
  return (
    <>
      <p>
        Select Slot here for {props.mobileNumber} and {props.address}
      </p>
      <br />
      <NavLink to="/selectAddress" className="btn-get-started">
        Back
      </NavLink>
    </>
  );
}

export default SelectSlot;
