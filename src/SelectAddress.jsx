import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BookNow from "./BookNow";
import SelectSlot from "./SelectSlot";

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

async function addAddressInBackend(address) {
  return fetch(`https://booking-service-kdewilj24a-uc.a.run.app/addaddress`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(address)
  }).then((response) => {
    if (!response.ok)
      throw new Error(`Error while adding address: ${response.status}`);
  });
}

function SelectAddress(props) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [addressSelected, setAddressSelected] = useState(false);
  const [name, setName] = useState("");
  const [primaryAddressLine, setPrimaryAddressLine] = useState("");
  const [secondaryAddressLine, setSecondaryAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const hanleAddAddressSubmit = async (e) => {
    e.preventDefault();
    var address = {
      name: name,
      primaryAddressLine: primaryAddressLine,
      secondaryAddressLine: secondaryAddressLine,
      landmark: landmark,
      city: city,
      state: state,
      pincode: pincode,
      mobileNumber: props.mobileNumber
    };
    await addAddressInBackend(address);
    // Redirect to Slot selection
    setAddressSelected(true);
    setSelectedAddress(address);
  };

  function addNewAddress() {
    return (
      <>
        <form onSubmit={hanleAddAddressSubmit}>
          <div class="form-group">
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Enter your name"
              maxLength="30"
              pattern="[A-Z a-z]*"
              title="Please use only these characters: A-Z a-z"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="primaryAddressLineInput"
              placeholder="Primary Address Line"
              maxLength="50"
              pattern="[# , A-Z a-z 0-9]*"
              title="Please use only these characters: #,A-Za-z0-9"
              required
              onChange={(e) => setPrimaryAddressLine(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="secondaryAddressLineInput"
              placeholder="Secondary Address Line (Optional)"
              maxLength="50"
              pattern="[# , A-Z a-z 0-9]*"
              title="Please use only these characters: #,A-Za-z0-9"
              onChange={(e) => setSecondaryAddressLine(e.target.value)}
            />
            <br />
            <input
              type="text"
              className="form-control"
              id="landmarkInput"
              placeholder="Landmark"
              maxLength="50"
              pattern="[# , A-Z a-z 0-9]*"
              title="Please use only these characters: #,A-Za-z0-9"
              required
              onChange={(e) => setLandmark(e.target.value)}
            />
            <br />
            <select
              className="form-select"
              aria-label="select city"
              required
              onChange={(e) => setCity(e.target.value)}
            >
              <option defaultValue>Select City</option>
              <option value="Bangalore">Bangalore</option>
            </select>
            <br />
            <select
              className="form-select"
              aria-label="select state"
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option defaultValue>Select State</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            <br />
            <input
              type="text"
              className="form-control"
              id="pincodeInput"
              placeholder="Pincode"
              maxLength="6"
              pattern="[0-9]{6}"
              title="Please enter a valid 6 digit pincode."
              required
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">
            Save and use address
          </button>
        </form>
      </>
    );
  }

  function hanleSelectAddressSubmit() {
    setAddressSelected(true);
  }

  function listAddresses() {
    return (
      <>
        <form onSubmit={hanleSelectAddressSubmit}>
          <table className="table table-hover">
            <tbody>
              {addresses.length > 0 &&
                addresses.map((address, index) => (
                  <tr>
                    <div class="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id={index}
                        required
                        onChange={(e) => setSelectedAddress(address)}
                      />
                      <label class="form-check-label" for={index}>
                        <address>{formatAddress(address)}</address>
                      </label>
                    </div>
                  </tr>
                ))}
            </tbody>
          </table>
          {addresses.length > 0 && (
            <button type="submit" className="btn btn-primary">
              Use this address
            </button>
          )}
        </form>
      </>
    );
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      `https://booking-service-kdewilj24a-uc.a.run.app/getalladdresses?mobileNumber=${props.mobileNumber}`
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

  if (!addressSelected) {
    return (
      <>
        <div className="container-fluid nav_bg">
          <div className="row">
            <div className="col-5 mx-auto d-flex justify-content-center order-1">
              {addresses.length > 0 && <h1>Select from saved addresses</h1>}
            </div>
            <div className="col-4 mx-auto order-2">
              <h1>Add a new address</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-5 mx-auto  d-flex justify-content-center order-1">
              {listAddresses()}
            </div>
            <div className="col-4 mx-auto order-2">{addNewAddress()}</div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <BookNow
        mobileNumber={props.mobileNumber}
        userValidated={true}
        addressSelected={addressSelected}
        address={JSON.stringify(selectedAddress)}
      />
    );
  }
}

export default SelectAddress;
