import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SelectAddress from "./SelectAddress";
import DatePicker from "react-date-picker";
import SlotPicker from "slotpicker";

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

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      `https://booking-service-kdewilj24a-uc.a.run.app/fetchfreeslots?latitude=0.0&longitude=0.0&durationInMinutes=${slotDurationInMinutes}&items[0].displayName=ALL`
    )
      .then((res) => res.json())
      .then(
        (slots) => {
          setAddresses(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {}
      );
  }, []);

  return (
    <>
      <p>
        Select Slot here for {props.mobileNumber} and {props.address}
      </p>
      <br />
      <DatePicker
        onChange={setDate}
        value={date}
        minDate={minDate}
        maxDate={maxDate}
        monthPlaceholder="mm"
        dayPlaceholder="dd"
        yearPlaceholder="yyyy"
        format="y-MM-dd"
      />
      <br />
      {date && (
        <SlotPicker
          // Required, interval between two slots in minutes, 30 = 30 min
          interval={slotDurationInMinutes}
          // Required, when user selects a time slot, you will get the 'from' selected value
          onSelectTime={(from) => handleTimeSelect(from)}
          // Optional, array of unavailable time slots
          unAvailableSlots={["10:00", "15:30"]}
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
      {isTimeSelected && <div>{startTime.$H}</div>}
      <NavLink to="/selectAddress" className="btn-get-started">
        Back
      </NavLink>
    </>
  );
}

export default SelectSlot;
