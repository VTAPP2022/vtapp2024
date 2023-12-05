"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AirtableEvent } from "@vtapp/types";
import { getPosterUrl } from "@vtapp/utils";

function EventCarousel({ events }: { events: AirtableEvent[] }) {
  const randomEvents = events
    .filter(
      (e) =>
        getPosterUrl(e) !== "https://i.imgur.com/2jzM0wr.jpg" && e.description
    )
    .slice(0, 5);

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < randomEvents.length - 1) {
      setIndex(index + 1);
    }

    if (index === randomEvents.length - 1) {
      setIndex(0);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }

    if (index === 0) {
      setIndex(randomEvents.length - 1);
    }
  };

  return randomEvents.length > 0 ? (
    <div>
      <div className=" mx-auto p-16 sm:p-24 lg:px-48 bg-gray-200">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-center text-gray-800 m-2">
            Events
          </h1>
          <br />
          {/* <p className="text-2xl text-center text-gray-800 m-5">
            {event.description}
          </p> */}
          <br />
          <br />
        </div>
        <div
          className="relative rounded-lg block md:flex items-center bg-gray-100 shadow-xl mt-5"
          style={{ minHeight: "19rem" }}
        >
          <div
            className="relative w-full md:w-2/5 h-full overflow-hidden rounded-t-lg md:rounded-t-none md:rounded-l-lg"
            style={{ minHeight: "19rem" }}
          >
            <Image
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={getPosterUrl(randomEvents[index])}
              alt={randomEvents[index].event_name}
              width={500}
              height={500}
            />
            <div className="absolute inset-0 w-full h-full bg-blue-900 opacity-50"></div>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center fill-current text-white">
              
            </div>
          </div>
          <div className="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg">
            <div className="p-12 md:pr-24 md:pl-16 md:py-12">
              <h1 className="text-3xl mb-5 animate-fade text-black">
                {randomEvents[index].event_name}
              </h1>
              <p className="text-gray-600 line-clamp-3">{randomEvents[index].description}</p>
              <Link
                className="flex items-baseline mt-3 text-blue-800 hover:text-blue-900 focus:text-blue-900"
                href={`/events/${randomEvents[index].slug}`}
              >
                <span>Read more</span>
                <span className="text-xs ml-1">&#x279c;</span>
              </Link>
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
            className="btn absolute top-0 mt-32 left-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-blue-600 hover:text-blue-400 focus:text-blue-400 -ml-6 focus:outline-none focus:shadow-outline"
            onClick={handlePrev}
          >
            <span className="block" style={{ transform: "scale(-1)" }}>
              &#x279c;
            </span>
          </button>
          <button
            className="btn absolute top-0 mt-32 right-0 bg-white rounded-full shadow-md h-12 w-12 text-2xl text-blue-600 hover:text-blue-400 focus:text-blue-400 -mr-6 focus:outline-none focus:shadow-outline"
            onClick={handleNext}
          >
            <span className="block" style={{ transform: "scale(1)" }}>
              &#x279c;
            </span>
          </button>
        </div>
        <div className="flex justify-center align-middle mt-16 relative z-10">
          <Link className="btn content-center" href="/events">
            Explore All Events
          </Link>
        </div>
      </div>
    </div>
  ) : null;
}

export default EventCarousel;
