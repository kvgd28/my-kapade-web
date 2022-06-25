import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function SelectAddress(props) {
  const [addresses, setAddresses] = useState([
    "#54, Vinayaka Layout, Magadi Main road, Beside Kamakshipalya traffice police station, Bangalore, Karnataka-560079",
    "#54, Vinayaka Layout, Magadi Main road, Beside Kamakshipalya traffice police station, Bangalore, Karnataka-560079"
  ]);

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
                  <td className="col-7">
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
                                <address>{address}</address>
                              </label>
                            </div>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button type="submit" className="btn btn-primary">
                      Use this address
                    </button>
                  </td>
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
