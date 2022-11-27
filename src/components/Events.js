import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Events() {
  const [EventData, setEventData] = useState([]);
  const [index, setIndex] = useState(0);
  const [event, setEvent] = useState({});
  const [isLoading, setLoading] = useState(true);

  const loadEvents = () => {
    fetch(`${process.env.PUBLIC_URL}/data/Events.json`).then((resp) =>
      resp.json().then((data) => {
        setEventData(data);
        setEvent(data[index]);
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      loadEvents();
    }
  });

  const handleNext = () => {
    if (index < EventData.length - 1) {
      setIndex(index + 1);
      setEvent(EventData[index + 1]);
    }

    if (index === EventData.length - 1) {
      setIndex(0);
      setEvent(EventData[0]);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setEvent(EventData[index - 1]);
    }

    if (index === 0) {
      setIndex(EventData.length - 1);
      setEvent(EventData[EventData.length - 1]);
    }
  };

  return (
    <div>
      <div className=" mx-auto p-16 sm:p-24 lg:px-48 bg-gray-200">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-center text-gray-800 m-2">
            Events
          </h1>
          <br />
          <p className="text-2xl text-center text-gray-800 m-5">
            "Technology driven transformation"- A theme chosen to show how
            diverse the applications of technology can be in our lives. The
            possibilities are limitless. And to make sure that you get an
            personalised insight of this, we present to you a rich assortment of
            events to be a part of. These events will present you a platform to
            do what you want, be it to learn something new, or present your
            skills and hold the audience spellbound, or to have a day full of
            fun with you friends.
          </p>
          <br />
          <br />
        </div>
        <div
          className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl"
          style={{ minHeight: "19rem" }}
        >
          <div
            className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style={{ minHeight: "19rem" }}
          >
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={event.imgurl}
              alt=""
            />
            <div className="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
              <h1 className="text-6xl font-BebasNeue animate-fade">
                {event.EventName}
              </h1>
            </div>
          </div>
          <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
            <div className="p-12 md:pr-24 md:pl-16 md:py-12">
              <p className="text-gray-600">{event.EventDec}</p>
              <a
                className="flex items-baseline mt-3 text-indigo-600 hover:text-indigo-900 focus:text-indigo-900"
                href={event.RegLink}
              >
                <span>Register to the event</span>
                <span className="text-xs ml-1">&#x279c;</span>
              </a>
            </div>
            <svg
              className="hidden md:block absolute inset-y-0 h-full w-24 fill-current text-gray-100 -ml-12"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
          <button
            className="btn absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -ml-6 focus:outline-none focus:shadow-outline"
            onClick={handlePrev}
          >
            <span className="block" style={{ transform: "scale(-1)" }}>
              &#x279c;
            </span>
          </button>
          <button
            className="btn absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-indigo-600 hover:text-indigo-400 focus:text-indigo-400 -mr-6 focus:outline-none focus:shadow-outline"
            onClick={handleNext}
          >
            <span className="block" style={{ transform: "scale(1)" }}>
              &#x279c;
            </span>
          </button>
        </div>
        <div className="flex justify-center align-middle mt-16  ">
          <Link className="btn content-center " to="/events">
            Explore All Events
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Events;
