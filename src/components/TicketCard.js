import React from "react";
import { QRCode } from "react-qrcode-logo";
import logo from "../assets/vtapp_logo.jpg";
import vtappLogo from "../assets/vtappnewlogo.svg";
import paidImg from "../assets/paid.png";
import expiredImg from "../assets/expired.png";

export const TicketCard = ({ event }) => {
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
        <img src={event.poster_url} alt="Event poster" className="w-full" />
      </div>
      <div className="bg-white">
        <h1 className="p-4 text-2xl font-black text-black border-b border-gray-300">
          {event.event_name}
        </h1>
        <div className="pb-4 flex flex-row border-b border-gray-300">
          <div>
            <p className="text-xs font-light text-black px-4 pt-4">Date</p>
            <p className="text-lg font-bold text-black px-4">
              Sun, 11 Dec, 2022
            </p>
          </div>
          <div className="justify-end ml-auto">
            <p className="text-xs font-light text-black px-4 pt-4">Time</p>
            <p className="text-lg font-bold text-black px-4">11:00 AM</p>
          </div>
        </div>
        <div className="pb-4 border-b border-gray-300">
          <p className="text-xs font-light text-black px-4 pt-4">Venue</p>
          <p className="text-lg font-bold text-black px-4">AB-2 Auditorium</p>
        </div>
      </div>
      <div className="flex flex-col bg-white pt-12">
        <p className="text-sm justify-center mx-auto text-black mb-4">
          {event.doc_id}
        </p>
        <div className="justify-center mx-auto">
          <QRCode
            value={event.doc_id}
            logoImage={logo}
            eyeColor={["#003B00", "#003B00", "#003B00"]}
            bgColor="#00FF41"
            fgColor="#003B00"
          />
        </div>

        <p className="justify-center mx-auto mt-3 mb-12 text-sm font-light text-black">
          Scan code for checking-in
        </p>
        <div className="border-b border-gray-300"></div>
      </div>
      <div className="flex flex-col bg-white py-3">
        <p className="justify-center mx-auto text-lg text-black font-medium">
          Enjoy the event
        </p>
      </div>
    </div>
  );
};
