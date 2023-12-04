import { AirtableEvent, EventType } from "@vtapp/types";
import Image from "next/image";
import Link from "next/link";

function EventCard({
  event,
  filter,
  search,
}: {
  event: AirtableEvent;
  filter: (filter: EventType) => void;
  search: (search: string) => void;
}) {
  return (
    <div className="flex flex-col z-10">
      <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-800 m-4 flex flex-col flex-1">
        <Image
          className="w-full aspect-[16/9]"
          src={
            event.poster_url && event.poster_url.length > 0
              ? event.poster_url[0].url
              : "https://i.imgur.com/2jzM0wr.jpg"
          }
          alt={event.event_name}
          loading="lazy"
          width={640}
          height={360}
        />
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">
            {event.event_name}
          </div>
          <p className="text-gray-300 text-base">{event.description}</p>
        </div>
        <div className="px-6 py-4">
          <button
            className="inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 rounded-md"
            onClick={() => search(event.organiser)}
          >
            {event.organiser}
          </button>
          <button
            className="inline-block bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 rounded-md"
            onClick={() => filter(event.event_type)}
          >
            {event.event_type}
          </button>
          {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span> */}
        </div>
        <br />
        <div className="px-6 pb-4 mt-auto mb-3">
          <p className="text-lg font-bold text-gray-300">
            Entry Fee: ₹{event.price}
          </p>
        </div>

        {/* // Uncomment below when event descriptions and registration exist */}
        <br />
        <div className="px-6 pb-4 mt-auto mb-3">
          <Link
            className="rounded-md p-3 bg-blue-400 text-black mr-3"
            href={`/events/${event.slug}`}
          >
            Read more
          </Link>
          <Link
            className="rounded-md p-3 bg-blue-500 text-black"
            href="https://vtop1.vitap.ac.in/VTAPP/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;