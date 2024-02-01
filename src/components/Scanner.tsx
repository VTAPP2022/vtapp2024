"use client";

import {
  verifyAdminClientSide,
  verifyQRCodeClientSide,
} from "@vtapp/lib/scanner";
import { AdminInfoWithEvents, AirtableEvent } from "@vtapp/types";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

export default function Scanner({ admin }: { admin: AdminInfoWithEvents }) {
  useEffect(() => {
    verifyAdminClientSide(admin);
  }, [admin]);

  const [chosenAdminEvent, setChosenAdminEvent] = useState<AirtableEvent>();

  return admin.user ? (
    <>
      <div className="flex justify-center">
        <p className="text-lg my-3">
          Welcome {admin.user.name} [{admin.user.email}]
        </p>
      </div>

      <div className="flex justify-center w-1/3 gap-4 mt-4 mx-auto">
        <select
          onChange={(input) => {
            setChosenAdminEvent(admin.events[parseInt(input.target.value, 10)]);
          }}
          className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
        >
          <option value="">Choose event to scan</option>
          {admin.events.map((ev, ind) => {
            return (
              <option value={ind} key={ind}>
                {ev.event_name}
              </option>
            );
          })}
        </select>
      </div>

      {chosenAdminEvent && (
        <>
          <div className="flex justify-center my-5">
            <p className="text-2xl">
              Scanning for <b>{chosenAdminEvent.event_name}</b>
            </p>
          </div>
          <div className="w-3/4 m-auto">
            <QrReader
              onResult={async (result, error) => {
                if (result) {
                  await verifyQRCodeClientSide(
                    chosenAdminEvent.event_name,
                    result.getText()
                  );
                }

                if (error) {
                  console.error(error);
                }
              }}
              constraints={{
                facingMode: "environment",
              }}
            />
          </div>
        </>
      )}
    </>
  ) : (
    <div>
      <section className="bg-slate-900 flex flex-col min-h-screen justify-center items-center">
        <div className=" px-6 py-10 mx-auto ">
          <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
            Loading...
          </h1>
        </div>
      </section>
    </div>
  );
}
