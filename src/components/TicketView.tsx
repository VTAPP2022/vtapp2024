"use client";

import { EventsRegistered } from "@vtapp/types";
import { useState } from "react";
import TicketCard from "./TicketCard";

export default function TicketView({
  registeredEvents,
}: {
  registeredEvents: EventsRegistered[];
}) {
  const [selectedEvent, setSelectedEvent] = useState<EventsRegistered>();

  return (
    <div className="flex flex-col h-fit py-20 bg-gray-900 xl:w-full mx-auto">
      <div className="mt-10 mx-auto">
        <select
          placeholder="Choose an event"
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700 z-10 relative"
          onChange={(e) => {
            setSelectedEvent(registeredEvents[parseInt(e.target.value)]);

            console.log(registeredEvents[parseInt(e.target.value)]);
          }}
        >
          <option value="">Choose an event</option>
          {registeredEvents.map((e, i) => {
            return (
              <option value={i} key={e.eventId}>
                {e.event?.event_name}
              </option>
            );
          })}
        </select>
      </div>
      {selectedEvent && selectedEvent.event && (
        <div className="flex flex-col my-12">
          <div className="mx-auto justify-center flex xl:w-3/4">
            <TicketCard event={selectedEvent} />
          </div>
        </div>
      )}
    </div>
  );
}
