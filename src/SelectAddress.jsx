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

async function addAddressInBackend(mobileNumber, address) {
  return fetch(
    `https://booking-service-kdewilj24a-uc.a.run.app/addaddress?mobileNumber=${mobileNumber}&name=${address.name}&primaryAddressLine=${address.primaryAddressLine}&secondaryAddressLine=${address.secondaryAddressLine}&landmark=${address.landmark}&state=${address.state}&city=${address.city}&pincode=${address.pincode}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Error while adding address: ${response.status}`);
  });
}

function AddNewAddress(props) {
  const [name, setName] = useState("");
  const [primaryAddressLine, setPrimaryAddressLine] = useState("");
  const [secondaryAddressLine, setSecondaryAddressLine] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [addressAdded, setAddressAdded] = useState(false);
  const [addedAddress, setAddedAddress] = useState({});

  const hanleAddAddressSubmit = async (e) => {
    e.preventDefault();
    var address = {
      name: name,
      primaryAddressLine: primaryAddressLine,
      secondaryAddressLine: secondaryAddressLine,
      landmark: landmark,
      city: city,
      state: state,
      pincode: pincode
    };
    await addAddressInBackend(props.mobileNumber, address);
    // Redirect to Slot selection
    setAddressAdded(true);
    setAddedAddress(address);
  };

  if (!addressAdded) {
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
  } else {
    return (
      <BookNow
        mobileNumber={props.mobileNumber}
        userValidated={true}
        addressSelected={addressAdded}
        address={addedAddress}
      />
    );
  }
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
  const [selectedAddress, setSelectedAddress] = useState({});
  const [addressSelected, setAddressSelected] = useState(false);

  function hanleSelectAddressSubmit() {
    setAddressSelected(true);
  }

  function listAddresses() {
    return (
      <>
        <form onSubmit={hanleSelectAddressSubmit}>
          <table className="table table-hover">
            <tbody>
              {addresses.map((address, index) => (
                <tr>
                  <div class="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id={index}
                      required
                      onChange={(e) => setSelectedAddress(e.target.value)}
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
        </form>
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

  if (!addressSelected) {
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
                    <td>
                      <AddNewAddress mobileNumber="9167520320" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
        address={selectedAddress}
      />
    );
  }
}

export default SelectAddress;
