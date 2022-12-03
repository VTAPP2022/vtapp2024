import React from "react";
import { Link } from "react-router-dom";

function EventCard({
  imgUrl,
  EventName,
  EventDisc,
  Organizer,
  Price,
  Type,
  filter,
  search,
}) {
  return (
    <div className="flex flex-col">
      <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 m-4 flex flex-col flex-1">
        <img
          className="w-full aspect-[16/9]"
          src={imgUrl}
          alt={EventName}
          loading="lazy"
        />
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">{EventName}</div>
          <p className="text-gray-300 text-base">{EventDisc}</p>
        </div>
        <div class="px-6 py-4">
          <button
            className="inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 rounded-md"
            onClick={() => search(Organizer)}
          >
            {Organizer}
          </button>
          <button
            className="inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 rounded-md"
            onClick={() => filter(Type.toLowerCase())}
          >
            {Type}
          </button>
          {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span> */}
        </div>
        <br />
        <div className="px-6 pb-4 mt-auto mb-3">
          <p className="text-lg font-bold text-gray-300">Entry Fee: ₹{Price}</p>
        </div>

        {/* // Uncomment below when event descriptions and registration exist */}
        <br />
        <div className="px-6 pb-4 mt-auto mb-3">
          {/* <Link
            className="rounded-md p-3 bg-green-400 text-black mr-3"
            to={`/events/${eventId}`}
          >
            Read more
          </Link> */}
          <a
            className="rounded-md p-3 bg-green-500 text-black"
            href="https://vtop1.vitap.ac.in/vtapp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register now
          </a>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
