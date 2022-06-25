import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function formatAddress(addressObj) {
  var secondaryAddressLine = <></>;
  if (
    addressObj.secondaryAddressLine &&
    addressObj.secondaryAddressLine !== ""
  ) {
    secondaryAddressLine = (
      <>
        {addressObj.secondaryAddressLine}
        <br />
      </>
    );
  }
  return (
    <>
      {addressObj.name}
      <br />
      {addressObj.primaryAddressLine}
      <br />
      {secondaryAddressLine}
      {addressObj.landmark}
      <br />
      {addressObj.city + ", " + addressObj.state + "-" + addressObj.pincode}
    </>
  );
}

function SelectAddress(props) {
  const [addresses, setAddresses] = useState([
    {
      name: "Gangadhar",
      primaryAddressLine: "#54, Vinayaka Layout, Magadi Main road",
      secondaryAddressLine: "",
      landmark: "Beside Kamakshipalya traffice police station",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560079"
    }
  ]);

  function listAddresses() {
    return (
      <>
        <table className="table table-hover">
          <tbody>
            {addresses.map((address, index) => (
              <tr>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={index}
                  />
                  <label class="form-check-label" for={index}>
                    <address>{formatAddress(address)}</address>
                  </label>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit" className="btn btn-primary">
          Use this address
        </button>
      </>
    );
  }

  /*
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      "https://booking-service-kdewilj24a-uc.a.run.app/getalladdresses?mobileNumber=8639955673"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setAddresses(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  }, []);
  */

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-10 mx-auto">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <h2>Select from your saved addresses</h2>
                  </th>
                  <th scope="col">
                    <h2>Add a new address </h2>
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="col-7">{listAddresses()}</td>
                  <td>Add a form here</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectAddress;
