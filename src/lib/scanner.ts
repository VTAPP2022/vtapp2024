import {
  AdminInfoWithEvents,
  CheckInResponse,
  CheckInStatusCode,
} from "@vtapp/types";
import { signIn, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Notiflix from "notiflix";

async function checkInTicketClientSide(eventName: string, ticketId: string) {
  const response = await fetch("/api/checkin", {
    method: "POST",
    body: JSON.stringify({
      ticketId,
    }),
  });

  const checkInResponse = (await response.json()) as CheckInResponse;

  switch (checkInResponse.code) {
    case CheckInStatusCode.UNAUTHORIZED:
      Notiflix.Report.failure(
        "Unauthorized",
        "You are not authorized to scan this QR Code. Please log in.",
        "OK"
      );
      break;
    case CheckInStatusCode.FORBIDDEN:
      Notiflix.Report.failure(
        "Forbidden",
        `You are not an admin for the event ${eventName}.`,
        "OK"
      );
      break;
    case CheckInStatusCode.INVALID_TICKET:
      Notiflix.Report.failure(
        "Invalid Ticket",
        "Ticket not found / is invalid.",
        "OK"
      );
      break;
    case CheckInStatusCode.ALREADY_CHECKED_IN:
      let message = "This ticket has already been checked in.";

      if (checkInResponse.details) {
        message = `Scanned on ${new Date(
          checkInResponse.details.scannedAt
        ).toLocaleDateString("en-US", {
          timeZone: "Asia/Mumbai",
        })} at ${new Date(checkInResponse.details.scannedAt).toLocaleTimeString(
          "en-US",
          { timeZone: "Asia/Mumbai" }
        )} by ${checkInResponse.details.scannedBy}`;
      }

      Notiflix.Report.failure("Already Checked-in", message, "OK");
      break;
    case CheckInStatusCode.SUCCESS:
      Notiflix.Report.success("Success", "Check-in successful.", "OK");
      break;
    case CheckInStatusCode.SERVER_ERROR:
      Notiflix.Report.failure(
        "Server Error",
        "Server error. Please try again later / contact admin.",
        "OK"
      );
      break;
    default:
      Notiflix.Report.failure(
        "Unknown Error",
        "An unknown error occured. Please try again later / contact admin.",
        "OK"
      );
      break;
  }
}

export async function verifyQRCodeClientSide(
  eventName: string,
  qrCodeText: string
) {
  const qrCodeTextParts = qrCodeText.split("/");

  if (qrCodeTextParts.length !== 3 || qrCodeTextParts[0] !== "VTAPP2K23") {
    Notiflix.Notify.failure("Invalid QR Code");
    return;
  }

  const ticketId = qrCodeTextParts[1];

  Notiflix.Confirm.show(
    "Confirm Check-in",
    `Event: ${eventName} - Ticket ID: ${ticketId} - Continue Check-in?`,
    "Yes",
    "No",
    async () => {
      await checkInTicketClientSide(eventName, ticketId);
    },
    () => {
      Notiflix.Notify.info("Check-in aborted.");
    }
  );
}

export async function verifyAdminClientSide(admin: AdminInfoWithEvents) {
  if (!admin.user) {
    await signIn("google");
    return;
  }

  if (!admin.isVitEmail) {
    alert(
      `Please use VIT-AP email address to login. Email used: [${admin.user.email}]`
    );
    await signOut();
    await signIn("google");
    return;
  }

  if (admin.events.length === 0) {
    alert(
      `You are not an admin of any event. Email used: [${admin.user.email}]`
    );
    await signOut();
    redirect("/");
  }
}
