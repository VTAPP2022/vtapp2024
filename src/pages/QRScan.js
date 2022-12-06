import React from "react";
import { QrReader } from "react-qr-reader";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../utils/firestore";

export const QRScan = () => {
  const verifyQRCode = async (text) => {
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

    await qrcodesRef.update({ qrcode_expired: true });

    alert("QRCode verified succcessfully");
  };

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            verifyQRCode(result.getText());
          }

          if (!!error) {
            console.error(error);
          }
        }}
        style={{ width: "100%" }}
        constraints={{ facingMode: "environment" }}
      />
    </>
  );
};
