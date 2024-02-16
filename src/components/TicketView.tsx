"use client";

import { EventsRegistered } from "@vtapp/types";
import { useEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { useRouter } from "next/navigation";
import Notiflix from "notiflix";

export default function TicketView({
  registeredEvents,
}: {
  registeredEvents: EventsRegistered[];
}) {
  const [selectedEvent, setSelectedEvent] = useState<EventsRegistered>();
  const router = useRouter();

  useEffect(() => {
    if (registeredEvents.length === 0) {
      Notiflix.Report.failure(
        "No tickets found",
        "You have no tickets.",
        "OK",
        () => router.push("/tickets")
      );
    }
  }, [registeredEvents, router]);

  return (
    <div className="flex flex-col h-fit py-20 bg-gray-900 xl:w-full mx-auto">
      <div className="mt-10 mx-auto flex flex-col items-center w-3/4">
        <label
          htmlFor="event"
          className="form-label inline-block mb-2 text-white text-lg text-center w-full"
        >
          Choose an event
        </label>
        <select
          placeholder="Choose an event"
          className="px-4 py-3 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700 z-10 relative w-full"
          onChange={(e) => {
            setSelectedEvent(registeredEvents[parseInt(e.target.value)]);
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
