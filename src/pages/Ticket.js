import React, { useState } from "react";
import { DateOfBirth } from "../components/DateOfBirth";
import { Document, Page } from "react-pdf";

const CLOUD_FUNCTIONS_URL =
  "https://asia-south1-vtapp-70e92.cloudfunctions.net";

export const Ticket = ({ events }) => {
  const [dob, setDob] = useState(new Date());
  const [applicationNo, setApplicationNo] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [applicantDetails, setApplicantDetails] = useState({});
  const [chosenEvent, setChosenEvent] = useState({});
  const [pdfBuffer, setPdfBuffer] = useState();

  console.log(pdfBuffer);

  function base64ArrayBuffer(arrayBuffer) {
    var base64 = "";
    var encodings =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    var bytes = new Uint8Array(arrayBuffer);
    var byteLength = bytes.byteLength;
    var byteRemainder = byteLength % 3;
    var mainLength = byteLength - byteRemainder;

    var a, b, c, d;
    var chunk;

    // Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
      // Combine the three bytes into a single integer
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

      // Use bitmasks to extract 6-bit segments from the triplet
      a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
      b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
      c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
      d = chunk & 63; // 63       = 2^6 - 1

      // Convert the raw binary segments to the appropriate ASCII encoding
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }

    // Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
      chunk = bytes[mainLength];

      a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

      // Set the 4 least significant bits to zero
      b = (chunk & 3) << 4; // 3   = 2^2 - 1

      base64 += encodings[a] + encodings[b] + "==";
    } else if (byteRemainder == 2) {
      chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

      a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
      b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

      // Set the 2 least significant bits to zero
      c = (chunk & 15) << 2; // 15    = 2^4 - 1

      base64 += encodings[a] + encodings[b] + encodings[c] + "=";
    }

    return base64;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const dobMonthRaw = dob.getMonth() + 1;
    const dobMonth =
      dobMonthRaw.toString().length > 1
        ? dobMonthRaw.toString()
        : `0${dobMonthRaw}`;
    const resp = await fetch(
      `${CLOUD_FUNCTIONS_URL}/get_events?app_no=${applicationNo}&dob=${dob.getDate()}-${dobMonth}-${dob.getFullYear()}`
    );

    if (resp.status !== 200) {
      alert("Failed fetching registration details");
      return;
    }

    const data = await resp.json();
    const details = data.applicantDetails;

    setRegisteredEvents(details.registered_events);

    const applicant = {
      email: details.applicant_email,
      name: details.applicant_name,
      application_no: details.application_no,
    };

    setApplicantDetails(applicant);
  };

  const onEventChoice = async (event) => {
    setChosenEvent(event);
    if (Object.keys(event).length === 0) {
      return;
    }
    const resp = await fetch(
      `${CLOUD_FUNCTIONS_URL}/get_ticket?event_id=${event.event_id}&doc_id=${event.doc_id}`
    );

    if (resp.status !== 200) {
      return;
    }

    const buffer = await resp.arrayBuffer();
    setPdfBuffer(`data:application/pdf;base64,${base64ArrayBuffer(buffer)}`);
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
            type="tel"
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
            placeholder="2022014521"
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

        <div className="mt-10 mx-auto">
          <select
            onChange={(e) => {
              if (!e.target.value) {
                onEventChoice({});
                return;
              }
              const chosen = registeredEvents.find(
                (event) => e.target.value === event.event_id
              );
              if (chosen) {
                onEventChoice(chosen);
              }
            }}
            placeholder="Choose an event"
            className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
          >
            <option value="">Choose an event</option>
            {registeredEvents.map((event) => {
              return <option value={event.event_id}>{event.event_name}</option>;
            })}
          </select>
        </div>
        <div className="mt-10 mx-auto">
          <Document file={pdfBuffer}>
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </>
  );
};
