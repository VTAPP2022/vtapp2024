import React from "react";
import { QRCode } from "react-qrcode-logo";
import logo from "../assets/vtapp_logo.jpg";
import vtappLogo from "../assets/vtappnewlogo.svg";
import paidImg from "../assets/paid.png";
import expiredImg from "../assets/expired.png";
import { BUNDLES } from "../utils/bundles";

export const TicketCard = ({ event, regType }) => {
  const eventName = regType.isIndividual
    ? event.event_name
    : regType.isEventPass
    ? "Event Pass (750/-)"
    : BUNDLES[event.bundle_type].event_name;
  const posterUrl = regType.isIndividual
    ? event.poster_url
    : regType.isBundle
    ? BUNDLES[event.bundle_type].poster_url
    : "https://i.imgur.com/2jzM0wr.jpg";
  const eventType = regType.isIndividual
    ? "INDIVIDUAL_TICKET"
    : regType.isBundle
    ? event.bundle_type
    : "EVENT_PASS";
  return (
    <div className="flex flex-col w-3/4 xl:w-1/2 bg-gray-900 h-full relative">
      <img
        src={event.qrcode_expired ? expiredImg : paidImg}
        alt="paid or expired logo"
        className="absolute bottom-5 right-0 h-32 md:h-40 lg:h-48"
      />
      <div className="bg-black px-4 p-4">
        <img src={vtappLogo} alt="vtapp logo" className="w-1/2" />
      </div>
      <div>
        <img src={posterUrl} alt="Event poster" className="w-full" />
      </div>
      <div className="bg-white">
        <h1 className="p-4 text-2xl font-black text-black border-b border-gray-300">
          {eventName}
        </h1>
        <h1 className="p-4 text-xl font-bold text-black border-b border-gray-300">
          {event.email}
        </h1>
        {regType.isEventPass && (
          <h1 className="p-4 text-lg font-light text-black border-b border-gray-300">
            {Object.keys(event.tracker).length} EVENT(S) ATTENDED
          </h1>
        )}
        {regType.isBundle && (
          <h1 className="p-4 text-lg font-light text-black border-b border-gray-300">
            {Object.entries(BUNDLES[event.bundle_type].limits).map((l) => {
              return l[1] > 0 ? (
                <p>
                  {`${Object.keys(event.bundle_tracker[l[0]]).length} / ${
                    l[1]
                  } ${l[0].toUpperCase()} `}
                </p>
              ) : (
                <p> "" </p>
              );
            })}
          </h1>
        )}

        {regType.isIndividual && (
          <>
            <div className="pb-4 flex flex-row border-b border-gray-300">
              <div>
                <p className="text-xs font-light text-black px-4 pt-4">Date</p>
                <p className="text-lg font-bold text-black px-4">
                  {event.date}
                </p>
              </div>
              <div className="justify-end ml-auto">
                <p className="text-xs font-light text-black px-4 pt-4">Time</p>
                <p className="text-lg font-bold text-black px-4">
                  {event.time}
                </p>
              </div>
            </div>
            <div className="pb-4 border-b border-gray-300">
              <p className="text-xs font-light text-black px-4 pt-4">Venue</p>
              <p className="text-lg font-bold text-black px-4">
                {event.room ? `${event.room},` : ""}
                {event.floor ? `${event.floor}, ` : ""}
                {event.place}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col bg-white pt-12">
        <p className="text-sm justify-center mx-auto text-black mb-4">
          {event.doc_id}
        </p>
        <div className="justify-center mx-auto">
          <QRCode value={`VTAPP/${event.doc_id}/${eventType}`} />
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
};
