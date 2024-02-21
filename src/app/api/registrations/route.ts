import { db, qrcodes } from "@vtapp/db";
import { fetchAdminDetails } from "@vtapp/lib/auth";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { createObjectCsvStringifier } from "csv-writer-browser";

export const runtime = "edge";

enum RegistrationStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

const particpantDetailsCsvStringifier = createObjectCsvStringifier({
  header: [
    { id: "applicantEmail", title: "Email" },
    { id: "applicantName", title: "Name" },
    { id: "qrcodeExpired", title: "QRCode Scanned (True/False)" },
    { id: "scannedBy", title: "QRCode Scanned By (email)" },
    { id: "scannedAt", title: "Scanned At (UTC)" },
  ],
});

export async function GET(request: NextRequest) {
  try {
    const eventIdString = request.nextUrl.searchParams.get("eventId");

    if (!eventIdString) {
      return new Response(
        JSON.stringify({
          success: false,
          code: RegistrationStatusCode.BAD_REQUEST,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
          statusText: "Invalid Request - eventId can't be empty.",
        }
      );
    }

    const eventId = parseInt(eventIdString);

    const { events, user, isVitEmail } = await fetchAdminDetails();

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          code: RegistrationStatusCode.FORBIDDEN,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
          statusText: "Unauthorized",
        }
      );
    }

    if (!isVitEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          code: RegistrationStatusCode.UNAUTHORIZED,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 403,
          statusText: "Forbidden - Not a VIT login.",
        }
      );
    }

    if (events.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          code: RegistrationStatusCode.FORBIDDEN,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 403,
          statusText: "Forbidden - You are not an admin for this event.",
        }
      );
    }

    const event = events.find(
      (event) =>
        event.sdc_id && event.sdc_id.split(",").map(parseInt).includes(eventId)
    );

    if (!event) {
      return new Response(
        JSON.stringify({
          success: false,
          code: RegistrationStatusCode.FORBIDDEN,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 403,
          statusText: "Forbidden - You are not an admin for this event.",
        }
      );
    }

    const participants = await db
      .select()
      .from(qrcodes)
      .where(eq(qrcodes.eventId, eventId));

    const csvHeaders = particpantDetailsCsvStringifier.getHeaderString();
    const csvRows =
      particpantDetailsCsvStringifier.stringifyRecords(participants);

    const csv = `${csvHeaders}${csvRows}`;

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${
          event.event_name
        }_participants (${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}).csv"`,
      },
    });
  } catch (error) {
    console.error("An error occured with getting data", error);
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
