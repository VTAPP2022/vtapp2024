import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../utils/firestore";
import { TicketCard } from "../components/TicketCard";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const qrcodeRef = collection(firestore, "qrcodes");

export const Ticket = () => {
  const ticket = React.useRef();
  const [applicationNo, setApplicationNo] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [applicantDetails, setApplicantDetails] = useState({});
  const [events, setEvents] = useState([]);
  const [chosenEvent, setChosenEvent] = useState({});
  const [isLoading, setLoading] = useState(true);

  const loadEvents = () => {
    fetch(`${process.env.PUBLIC_URL}/data/events_list.json`).then((resp) =>
      resp.json().then((data) => {
        setEvents(data);
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      loadEvents();
    }
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const q = query(
      qrcodeRef,
      where("application_no", "==", parseInt(applicationNo))
    );
    const snapshot = await getDocs(q);
    const rEvents = [];
    snapshot.forEach((doc) => {
      const data = doc.data();

      if (!applicantDetails) {
        const applicant = {
          email: data.applicant_email,
          name: data.applicant_name,
          application_no: data.application_no,
        };
        setApplicantDetails(applicant);
      }
      const registeredEvent = events.find(
        (event) => parseInt(event.event_id) === data.event_id
      );

      if (registeredEvent) {
        rEvents.push({ doc_id: doc.id, ...registeredEvent });
      }
    });
    setRegisteredEvents(rEvents);
  };

  const downloadPdf = async () => {
    const element = ticket.current;
    const canvas = await html2canvas(element);
    setTimeout(() => {
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ticket.pdf");
    }, 3000);
  };

  return (
    <>
      <div className="flex flex-col h-fit py-20 bg-gray-900">
        <div className="xl:w-96 mx-auto">
          <label
            for="exampleFormControlInput1"
            className="form-label inline-block mb-2 text-white text-xl"
          >
            Application number
          </label>
          <div className="flex flex-row gap-4">
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
            <button
              className="inline-block bg-gray-100 px-3
        py-1.5 text-sm font-semibold text-gray-700 mr-2 rounded-md"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="mt-10 mx-auto">
          <select
            disabled={!registeredEvents.length > 0}
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
              return <option value={event.event_id}>{event.event_name}</option>;
            })}
          </select>
        </div>
        {Object.keys(chosenEvent).length !== 0 && (
          <div className="flex flex-col my-12" ref={ticket}>
            <div className="flex justify-center mx-auto">
              <TicketCard event={chosenEvent} />
            </div>

            <button
              onClick={downloadPdf}
              className="inline-block bg-gray-100 p-3 text-sm font-semibold text-gray-700 mt-10 rounded-md w-fit justify-center mx-auto"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </>
  );
};
