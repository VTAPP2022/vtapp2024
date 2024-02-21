import { AirtableEvent, EventType } from "@vtapp/types";
import { getPosterUrl } from "@vtapp/utils";
import Image from "next/image";
import Link from "next/link";

function EventCard({
  event,
  filter,
  search,
  updateLink,
}: {
  event: AirtableEvent;
  updateLink?: string;
  filter: (filter: EventType) => void;
  search: (search: string) => void;
}) {
  return (
    <div className="flex flex-col z-10">
      <div className="max-w-[22rem] rounded overflow-hidden shadow-lg bg-gray-800 m-4 flex flex-col flex-1">
        <Image
          className="w-full aspect-[16/9] object-cover"
          src={getPosterUrl(event)}
          alt={event.event_name}
          loading="lazy"
          width={640}
          height={360}
        />
        <div className="px-6 py-4">
          <div className="text-white font-bold text-xl mb-2">
            {event.event_name}
          </div>
          <p className="text-gray-300 text-base line-clamp-5">
            {event.description}
          </p>
        </div>
        <div className="px-6 py-4">
          <button
            className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-700 mr-2 mb-2"
            onClick={() => search(event.organiser)}
          >
            {event.organiser}
          </button>
          <button
            className="whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-700 mr-2 mb-2"
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
          {!updateLink ? (
            <>
              <Link
                className="rounded-md px-5 py-3 bg-blue-400 text-black mr-3"
                href={`/events/${event.slug}`}
              >
                Read more
              </Link>
              <Link
                className="rounded-md px-5 py-3 bg-blue-500 text-black"
                href="https://vtop1.vitap.ac.in/VTAPP/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register now
              </Link>
            </>
          ) : (
            <div className="flex flex-row gap-2 flex-wrap">
              <Link
                className="rounded-md px-5 py-3 bg-blue-500 text-black"
                href={updateLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Update Event Details
              </Link>
              <Link
                className="rounded-md px-5 py-3 bg-blue-500 text-black"
                href={`/api/registrations?eventId=${event.sdc_id}`}
              >
                Download Participants List (CSV)
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
