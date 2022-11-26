import React from "react";

function EventCard({ imgUrl, EventName, EventDisc, Organizer, Price, Type }) {
  return (
    <div className="flex">
      <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 m-4">
        <img className="w-full" src={imgUrl} alt={EventName} />
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">{EventName}</div>
          <p className="text-gray-300 text-base">{EventDisc}</p>
        </div>
        <div class="px-6 pt-4">
          <span class="inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 rounded-full">
            {Organizer}
          </span>
          <span class="inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 rounded-full">
            {Type}
          </span>
          {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span> */}
        </div>
        <br />
        <div className="px-6 pb-4">
          <button className="rounded-md p-2 bg-green-400 text-black mr-3">
            Read more
          </button>
          <button className="rounded-md p-2 bg-green-400 text-black">
            Register now
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
