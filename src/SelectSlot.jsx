import React, { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import SelectAddress from "./SelectAddress";
import DatePicker from "react-datepicker";
import SlotPicker from "slotpicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "bootstrap";
import BookingStatus from "./BookingStatus";

function SelectSlot(props) {
  const [date, setDate] = useState();
  const [minDate, setMinDate] = useState(new Date());
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 3);
  const [maxDate, setMaxDate] = useState(currentDate);
  const [startTime, setStartTime] = useState();
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [invalidSlots, setInvalidSlots] = useState([]);
  const [myUrl, setMyUrl] = useState();
  const [isBookingSuccessful, setIsBookingSuccessful] = useState(false);
  const [isBookingError, setIsBookingError] = useState(false);

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
    var url = `https://booking-service-kdewilj24a-uc.a.run.app/bookslot`;
    setMyUrl(url);
    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          mobileNumber: props.mobileNumber
        },
        slotStartTimeEpoch: slotStartTimeEpoch,
        slotEndTimeEpoch: slotEndTimeEpoch,
        address: selectedAddress
      })
    }).then((response) => {
      if (!response.ok) {
        setIsBookingError(true);
      } else {
        setIsBookingSuccessful(true);
      }
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

  if (isBookingSuccessful) {
    return <BookingStatus isSuccess="true" />;
  } else if (isBookingError) {
    return <BookingStatus isSuccess="false" />;
  }
  return (
    <>
      {myUrl && <div>{myUrl}</div>}
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 pb-2 pt-3">
            <h2 className="d-flex justify-content-center">
              Select a slot for shopping
            </h2>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 pt-3 mx-auto d-flex justify-content-center">
            <DatePicker
              inline
              minDate={minDate}
              maxDate={maxDate}
              onChange={(date) => setDate(date)}
            />
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-sm-10 col-lg-6 mx-auto">
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
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row">
          <div className="col-3"></div>
          <div className="col-2 mx-auto d-flex justify-content-center">
            <NavLink
              style={{
                "background-color": "coral",
                color: "white"
              }}
              to="/selectAddress"
              className="btn-get-started"
            >
              Back
            </NavLink>
          </div>
          <div className="col-2"></div>
          <div className="col-2 mx-auto d-flex justify-content-center">
            {isTimeSelected && (
              <button
                style={{ "background-color": "lightseagreen", color: "white" }}
                onClick={bookSlot}
                className="btn-get-started"
              >
                Book
              </button>
            )}
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
}

export default SelectSlot;
