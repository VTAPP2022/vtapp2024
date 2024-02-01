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
      Notiflix.Notify.failure(
        "You are not authorized to scan this QR Code. Please log in."
      );
      break;
    case CheckInStatusCode.FORBIDDEN:
      Notiflix.Notify.failure(
        `You are not an admin for the event ${eventName}.`
      );
      break;
    case CheckInStatusCode.INVALID_TICKET:
      Notiflix.Notify.failure("Ticket not found / is invalid.");
      break;
    case CheckInStatusCode.ALREADY_CHECKED_IN:
      Notiflix.Notify.failure("This ticket has already been checked in.");
      break;
    case CheckInStatusCode.SUCCESS:
      Notiflix.Notify.success("Check-in successful.");
      break;
    case CheckInStatusCode.SERVER_ERROR:
      Notiflix.Notify.failure("Server error. Please try again later.");
      break;
    default:
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
    "Do you want to check-in this ticket?",
    `You are about to verify a ticket for event ${eventName}. Please note that this action cannot be undone. Ticket ID: ${ticketId}`,
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
