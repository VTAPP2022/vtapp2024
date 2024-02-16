import { EventsRegistered } from "@vtapp/types";
import Image from "next/image";
import expiredImg from "@vtapp/assets/expired.png";
import paidImg from "@vtapp/assets/paid.png";
import vtappLogo from "@vtapp/assets/vtapp-logo.png";
import { QRCode } from "react-qrcode-logo";
import { getPosterUrl } from "@vtapp/utils";

export default function TicketCard({ event }: { event: EventsRegistered }) {
  return (
    <div className="flex flex-col w-3/4 xl:w-1/2 bg-gray-900 h-full relative">
      <Image
        src={event.qrcodeExpired ? expiredImg : paidImg}
        alt="paid or expired logo"
        className="absolute bottom-5 right-0 h-32 md:h-40 lg:h-48"
        width={200}
        height={200}
      />
      <div className="bg-black px-4 p-4">
        <Image
          src={vtappLogo}
          alt="vtapp logo"
          className="w-1/2"
          width={100}
          height={100}
        />
      </div>
      <div>
        <Image
          src={
            event.event
              ? getPosterUrl(event.event)
              : "https://i.imgur.com/2jzM0wr.jpg"
          }
          alt="Event poster"
          className="w-full"
          width={640}
          height={360}
        />
      </div>
      <div className="bg-white">
        <h1 className="p-4 text-2xl font-black text-black border-b border-gray-300">
          {event.event.event_name}
        </h1>
        <h1 className="p-4 text-xl font-light text-black border-b border-gray-300">
          {event.applicantEmail}
        </h1>
        {event.event.datetime_start && (
          <div className="pb-4 flex flex-row border-b border-gray-300">
            <div>
              <p className="text-xs font-light text-black px-4 pt-4">Date</p>
              <p className="text-lg text-black px-4">
                {new Date(event.event.datetime_start).toLocaleDateString()}
              </p>
            </div>
            <div className="justify-end ml-auto">
              <p className="text-xs font-light text-black px-4 pt-4">Time</p>
              <p className="text-lg text-black px-4">
                {new Date(event.event.datetime_start).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
        <div className="pb-4 border-b border-gray-300">
          <p className="text-xs font-light text-black px-4 pt-4">Venue</p>
          <p className="text-lg font-bold text-black px-4">
            {event.event?.room ? `${event.event?.room},` : ""}
            {event.event?.floor ? `${event.event?.floor}, ` : ""}
            {event.event?.place}
          </p>
        </div>
      </div>
      <div className="flex flex-col bg-white pt-12">
        <p className="text-sm justify-center mx-auto text-black mb-4">
          {event.id}
        </p>
        <div className="justify-center mx-auto">
          <QRCode value={`VTAPP2K23/${event.id}/TICKET`} />
        </div>

        <p className="justify-center mx-auto mt-3 mb-12 text-sm font-light text-black">
          Scan code for checking-in
        </p>
        <div className="border-b border-gray-300"></div>
      </div>
      <div className="flex flex-col bg-white py-3">
        <p className="justify-center mx-auto text-lg text-black font-medium">
          Enjoy the event(s)
        </p>
      </div>
    </div>
  );
}
