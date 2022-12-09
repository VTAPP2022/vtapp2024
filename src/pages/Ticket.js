import React, { useState } from "react";
import { DateOfBirth } from "../components/DateOfBirth";
import { TicketCard } from "../components/TicketCard";
import ReactLoading from "react-loading";

const CLOUD_FUNCTIONS_URL =
  "https://asia-south1-vtapp-70e92.cloudfunctions.net/api";

export const Ticket = () => {
  const [dob, setDob] = useState(new Date());
  const [applicationNo, setApplicationNo] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [applicantDetails, setApplicantDetails] = useState({});
  const [regType, setRegType] = useState({});
  const [chosenEvent, setChosenEvent] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [dropdown, showDropdown] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(dob);
    const dobMonthRaw = dob.getMonth() + 1;
    const dobMonth =
      dobMonthRaw.toString().length > 1
        ? dobMonthRaw.toString()
        : `0${dobMonthRaw}`;
    const dobDateRaw = dob.getDate();
    const dobDate =
      dobDateRaw.toString().length > 1
        ? dobDateRaw.toString()
        : `0${dobDateRaw}`;

    const resp = await fetch(
      `${CLOUD_FUNCTIONS_URL}/get_events?app_no=${applicationNo}&dob=${dobDate}-${dobMonth}-${dob.getFullYear()}`
    );

    if (resp.status !== 200) {
      alert("Failed fetching registration details");
      setIsLoading(false);
      return;
    }

    const details = await resp.json();
    setApplicantDetails(details);

    setRegisteredEvents(details.registered_events);
    setRegType({
      isBundle: details.isBundle || false,
      isIndividual: details.isIndividual || false,
      isEventPass: details.isEventPass || false,
    });
    setIsLoading(false);

    if (details.isIndividual) {
      showDropdown(true);
    }
  };

  return (
    <>
      <div className="flex flex-col h-fit py-20 bg-gray-900">
        <div className="xl:w-96 mx-auto">
          <label
            for="exampleFormControlInput1"
            className="form-label inline-block mb-2 text-white text-lg text-center w-full"
          >
            Application number
          </label>
          <input
            type="text"
            onChange={(e) => setApplicationNo(e.target.value)}
            className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:outline-none
      "
            id="exampleFormControlInput1"
            placeholder="2022123456 (or) VITAA221234"
          />
        </div>
        <div className="mt-10 mx-auto">
          <label
            for="exampleFormControlInput1"
            className="form-label inline-block mb-2 text-white text-lg text-center w-full"
          >
            Date of Birth
          </label>
          <DateOfBirth setSelectedDate={setDob} selectedDate={dob} />
        </div>
        <div className="mt-10 mx-auto">
          <button
            disabled={
              dob.toDateString() === new Date().toDateString() || !applicationNo
            }
            className="inline-block bg-green-300 disabled:bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 rounded-md"
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </button>
        </div>

        {isLoading && (
          <div className="mt-10 mx-auto">
            <ReactLoading type="spin" color="#36D399" />
          </div>
        )}

        {(regType.isEventPass || regType.isBundle) && (
          <div className="flex flex-col my-12">
            <div className="mx-auto justify-center flex">
              <TicketCard event={applicantDetails} regType={regType} />
            </div>
          </div>
        )}

        {dropdown && (
          <div className="mt-10 mx-auto">
            <select
              onChange={(e) => {
                if (!e.target.value) {
                  setChosenEvent({});
                  return;
                }
                const chosen = registeredEvents.find(
                  (event) => e.target.value === event.event_id
                );
                if (chosen) {
                  setChosenEvent(chosen);
                }
              }}
              placeholder="Choose an event"
              className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
            >
              <option value="">Choose an event</option>
              {registeredEvents.map((event) => {
                return (
                  <option value={event.event_id}>{event.event_name}</option>
                );
              })}
            </select>
          </div>
        )}

        {Object.keys(chosenEvent).length > 0 && (
          <div className="flex flex-col my-12">
            <div className="mx-auto justify-center flex">
              <TicketCard event={chosenEvent} regType={regType} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
