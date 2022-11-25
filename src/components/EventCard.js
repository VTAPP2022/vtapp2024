import React from "react";

function EventCard({ imgUrl, EventName, EventDisc, Organizer, Price, Type }) {
  return (
    <div>
      <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 m-4">
        <img className="w-full" src={imgUrl} alt={EventName} />
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">{EventName}</div>
          <p className="text-gray-300 text-base">{EventDisc}</p>
          {/* <br />

          <button className="rounded-md p-3 px-7 bg-green-400 text-black">
            ADD
          </button> */}
        </div>
        <div class="px-6 pt-4 pb-2">
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
      </div>
    </div>
  );
}

export default EventCard;
