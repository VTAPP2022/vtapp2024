import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { ViewFinder } from "../components/ViewFinder";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../utils/firestore";

export const QRScan = ({ events }) => {
  const [inProcess, setInProcess] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState(false);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    if (events.length > 0) {
      setLoadedEvents(true);
    }
  }, [events]);

  const verifyQRCode = async (text) => {
    if (inProcess) {
      return;
    }

    if (!events.length > 0) {
      console.log("events not loaded");
      return;
    }

    setInProcess(true);

    if (!text.length === 20) {
      alert("Invalid QRCode");
      return;
    }
    const qrcodesRef = doc(firestore, "qrcodes", text);
    const docSnapshot = await getDoc(qrcodesRef);

    if (!docSnapshot.exists()) {
      alert("Invalid QRCode");
      return;
    }

    const qrcodeData = docSnapshot.data();

    if (qrcodeData.qrcode_expired) {
      alert("QRCode already expired");
      return;
    }

    console.info(events);

    const event = events.find((e) => {
      console.info(e);
      return parseInt(e.event_id) === qrcodeData.event_id;
    });

    if (!event) {
      alert("Not found");
      return;
    }

    if (
      window.confirm(
        `Do you want to verify ticket for event ${event.event_name}?`
      )
    ) {
      await updateDoc(qrcodesRef, { qrcode_expired: true });
      alert("QRCode verified succcessfully");
      return;
    }

    alert("Aborted QRCode verification");
  };

  return (
    loadedEvents && (
      <div className="w-3/4 m-auto">
        <QrReader
          onResult={async (result, error) => {
            if (!!result) {
              await verifyQRCode(result.getText());
              await sleep(1000);
              setInProcess(false);
            }

            if (!!error) {
              return;
            }
          }}
          constraints={{ facingMode: "environment" }}
          scanDelay={2000}
          ViewFinder={ViewFinder}
        />
      </div>
    )
  );
};
