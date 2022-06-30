import React, { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import SelectAddress from "./SelectAddress";
import DatePicker from "react-datepicker";
import SlotPicker from "slotpicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "bootstrap";

function SelectSlot(props) {
  const [date, setDate] = useState();
  const [minDate, setMinDate] = useState(new Date());
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  const [maxDate, setMaxDate] = useState(currentDate);
  const [startTime, setStartTime] = useState();
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [invalidSlots, setInvalidSlots] = useState([]);

  const slotDurationInMinutes = 60;

  function handleTimeSelect(fromTime) {
    setStartTime(fromTime);
    setIsTimeSelected(true);
  }

  async function bookSlot() {
    const selectedAddress = JSON.parse(props.address);
    // This logic needs to be changed if slot duration changes.
    const slotStartTimeEpoch =
      date.getTime() + new Date(startTime).getHours() * 60 * 60 * 1000;
    const slotEndTimeEpoch =
      slotStartTimeEpoch + slotDurationInMinutes * 60 * 1000;
    var url = `https://booking-service-kdewilj24a-uc.a.run.app/bookslot?`;
    url = url + `user.mobileNumber=${props.mobileNumber}&`;
    url =
      url +
      `slotStartTimeEpoch=${slotStartTimeEpoch}&slotEndTimeEpoch=${slotEndTimeEpoch}&`;
    url =
      url +
      `address.name=${selectedAddress.name}&address.primaryAddressLine=${selectedAddress.primaryAddressLine}&address.secondaryAddressLine=${selectedAddress.secondaryAddressLine}&address.landmark=${selectedAddress.landmark}&address.city=${selectedAddress.city}&address.state=${selectedAddress.state}&address.pincode=${selectedAddress.pincode}`;
    return fetch(url).then((response) => {
      if (!response.ok)
        throw new Error(`Error while adding address: ${response.status}`);
    });
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    var epochStart = minDate.getTime(); // start of the day
    var epochEnd = maxDate.getTime() + 86400000; // end of the day
    fetch(
      `https://booking-service-kdewilj24a-uc.a.run.app/fetchinvalidslots?slotDurationInMinutes=60&startTime=${epochStart}&endTime=${epochEnd}`
    )
      .then((res) => res.json())
      .then(
        (slots) => {
          setInvalidSlots(slots);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  }, [minDate, maxDate]);

  return (
    <>
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="pt-5 justify-content-center">
              <h2 className="pb-2">Select a slot for the visit </h2>
              <DatePicker
                inline
                minDate={minDate}
                maxDate={maxDate}
                onChange={(date) => setDate(date)}
              />
            </div>
            <br />
            {date && (
              <SlotPicker
                // Required, interval between two slots in minutes, 30 = 30 min
                interval={slotDurationInMinutes}
                // Required, when user selects a time slot, you will get the 'from' selected value
                onSelectTime={(from) => handleTimeSelect(from)}
                // Optional, array of unavailable time slots
                unAvailableSlots={invalidSlots
                  .filter(
                    (slot) =>
                      new Date(slot.startTimeInEpoch).getDate() ===
                      date.getDate()
                  )
                  .map(
                    (slot) =>
                      "" +
                      new Date(slot.startTimeInEpoch).getHours() +
                      ":" +
                      new Date(slot.startTimeInEpoch)
                        .getMinutes()
                        .toLocaleString("en-US", {
                          minimumIntegerDigits: 2,
                          useGrouping: false
                        })
                  )}
                // Optional, 8AM the start of the slots
                from={"10:00"}
                // Optional, 09:00PM the end of the slots
                to={"20:00"}
                // Optional, 01:00 PM, will be selected by default
                //defaultSelectedTime={"13:00"}
                // Optional, selected slot color
                selectedSlotColor="#F09999"
                // Optional, language of the displayed text, default is english (en)
                lang="en"
              />
            )}
            <table className="table justify-content-center table-borderless">
              <tbody>
                <tr>
                  <td>
                    <NavLink to="/selectAddress" className="btn-get-started">
                      Back
                    </NavLink>
                  </td>
                  {isTimeSelected && (
                    <td>
                      <button onClick={bookSlot} className="btn-get-started">
                        Book
                      </button>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectSlot;
