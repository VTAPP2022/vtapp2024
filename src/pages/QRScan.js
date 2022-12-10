import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../utils/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { authApp, signInWithGoogle, signOutGoogle } from "../utils/auth";
import { BUNDLES } from "../utils/bundles";

export const QRScan = ({ events }) => {
  const [inProcess, setInProcess] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState(false);
  const [currentUser, setCurrentUser] = useState(authApp.currentUser);
  const [adminEvents, setAdminEvents] = useState([]);
  const [chosenAdminEvent, setChosenAdminEvent] = useState({});

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    if (events.length > 0) {
      setLoadedEvents(true);
      const unsubAuth = onAuthStateChanged(authApp, (user) => {
        if (user) {
          const domain = user.email.split("@")[1];

          if (!(domain === "vitap.ac.in" || domain === "vitapstudent.ac.in")) {
            alert("Only VITAP email can be used to login");
            signOutGoogle();
            return;
          }

          const adminEvents = events.filter((e) => {
            return e.admins
              ? e.admins.includes(user.email.toLowerCase())
              : false;
          });
          if (adminEvents.length > 0) {
            setAdminEvents(adminEvents);
          } else {
            alert(`You are not admin for any event. ${user.email}`);
            return signOutGoogle();
          }
        }

        setCurrentUser(user);
      });

      return () => unsubAuth();
    }
  }, [events]);

  const verifyIndividualTicket = async (codeId) => {
    const qrcodesRef = doc(firestore, "qrcodes", codeId);
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

    if (parseInt(chosenAdminEvent.event_id) !== qrcodeData.event_id) {
      alert("You are not authorized to verify this QRCode");
      return;
    }

    if (
      window.confirm(
        `Do you want to verify ticket for event ${chosenAdminEvent.event_name}?`
      )
    ) {
      await updateDoc(qrcodesRef, { qrcode_expired: currentUser.email });
      alert("QRCode verified succcessfully");
      return;
    }

    alert("Aborted QRCode verification");
  };

  const verifyEventPass = async (codeId) => {
    // 750 Rs ticket
    if (chosenAdminEvent.event_id === 34) {
      // lazer ops
      alert("Invalid QRCode. Lazer Ops is not included");
      return;
    }
    const eventPassRef = doc(firestore, "event_passes", codeId);
    const docSnapshot = await getDoc(eventPassRef);

    if (!docSnapshot.exists()) {
      alert("Invalid QRCode");
      return;
    }

    const eventPassData = docSnapshot.data();

    if (eventPassData.tracker[chosenAdminEvent.event_id]) {
      alert("QRCode already expired.");
      return;
    }

    if (
      window.confirm(
        `Do you want to verify ticket for event ${chosenAdminEvent.event_name}?`
      )
    ) {
      await updateDoc(eventPassRef, {
        [`tracker.${chosenAdminEvent.event_id}`]: currentUser.email,
      });
      alert("QRCode verified succcessfully");
      return;
    }
  };

  const verifyBundle = async (codeId, qrType) => {
    const currentEventType = chosenAdminEvent.event_type.toLowerCase().trim();

    const bundleRef = doc(firestore, "bundle_codes", codeId);
    const docSnapshot = await getDoc(bundleRef);

    if (!docSnapshot.exists()) {
      alert("Invalid QRCode");
      return;
    }

    const bundleData = docSnapshot.data();
    const attended = bundleData.bundle_tracker[currentEventType];
    if (!attended) {
      alert(`Bundle ${qrType} doesn't include ${currentEventType} events`);
      return;
    }

    if (attended[chosenAdminEvent.event_id]) {
      alert("QRCode expired. This event was already attended before");
      return;
    }

    const attendedLen = Object.keys(attended).length;

    if (attendedLen + 1 > BUNDLES[qrType].limits[currentEventType]) {
      alert(
        `QRCode expired. Maximum number of ${currentEventType}(s) attended.`
      );
      return;
    }

    if (
      window.confirm(
        `Do you want to verify ticket for event ${chosenAdminEvent.event_name}?`
      )
    ) {
      await updateDoc(bundleRef, {
        [`bundle_tracker.${currentEventType}.${chosenAdminEvent.event_id}`]:
          currentUser.email,
      });
      alert("QRCode verified succcessfully");
      return;
    }
  };

  const verifyQRCode = async (text) => {
    if (!text) {
      return;
    }

    if (inProcess) {
      return;
    }

    if (!events.length > 0) {
      console.error("events not loaded");
      return;
    }

    if (!chosenAdminEvent) {
      console.error("You haven't chosen any event to scan QR code for.");
      return;
    }

    setInProcess(true);

    const qrsplit = text.split("/");
    if (!qrsplit[0] === "VTAPP") {
      alert("Invalid QRCode");
      return;
    }
    const codeId = qrsplit[1];
    const qrType = qrsplit[2];

    console.log(qrType);

    if (qrType === "INDIVIDUAL_TICKET") {
      return await verifyIndividualTicket(codeId);
    } else if (qrType === "EVENT_PASS") {
      return await verifyEventPass(codeId);
    } else if (BUNDLES[qrType]) {
      return await verifyBundle(codeId, qrType);
    }
  };

  return (
    loadedEvents && (
      <>
        <div className="flex justify-center">
          <button
            onClick={!currentUser ? signInWithGoogle : signOutGoogle}
            className="rounded-lg p-2 px-3 bg-green-400 text-black text-lg"
          >
            {!currentUser ? "Sign In with Google" : "Sign out"}
          </button>
        </div>
        {currentUser && (
          <>
            <div className="flex justify-center">
              <p className="text-lg my-3">
                Hi {currentUser.displayName} [{currentUser.email}]
              </p>
            </div>
            {adminEvents.length > 0 && (
              <div className="flex justify-center w-1/3 gap-4 mt-4 mx-auto">
                <select
                  onChange={(inp) => {
                    setChosenAdminEvent(
                      adminEvents.find(
                        (ev) => ev.event_id === inp.target.value
                      ) || {}
                    );
                  }}
                  className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
                >
                  <option value="">Choose event to scan</option>
                  {adminEvents.map((ev) => {
                    return <option value={ev.event_id}>{ev.event_name}</option>;
                  })}
                </select>
              </div>
            )}
            {Object.keys(chosenAdminEvent).length > 0 && (
              <>
                <div className="flex justify-center my-5">
                  <p className="text-2xl">
                    Scanning for <b>{chosenAdminEvent.event_name}</b>
                  </p>
                </div>
                <div className="w-3/4 m-auto">
                  <QrReader
                    onScan={async (result) => {
                      await verifyQRCode(result);
                      setInProcess(false);
                    }}
                    onError={(error) => console.error(error)}
                    facingMode="environment"
                  />
                </div>
              </>
            )}
          </>
        )}
      </>
    )
  );
};
