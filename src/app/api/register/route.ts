import { TicketEntry } from "@vtapp/types";
import { config, qrcodes } from "@vtapp/db";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { sql } from "drizzle-orm";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("X-ADMIN-API-KEY");

    if (!authHeader) {
      return new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
        statusText: "Unauthorized",
      });
    }

    if (authHeader !== process.env.EVENTS_ADMIN_API_KEY) {
      return new Response(JSON.stringify({ success: false }), {
        headers: { "Content-Type": "application/json" },
        status: 403,
        statusText: "Forbidden",
      });
    }

    const body = await request.json();
    const {
      application_no: applicationNo,
      applicant_name: applicantName,
      applicant_email: applicantEmail,
      applicant_phn_no: applicantPhoneNo,
      date_of_birth: dateOfBirth,
      registered_events: eventsRegistered,
    } = body as TicketEntry;

    const qrcodesForEvents = eventsRegistered.map((eventId) => {
      return {
        applicationNo,
        applicantName,
        applicantEmail,
        applicantPhoneNo,
        dateOfBirth,
        eventId,
      };
    });

    const connection = connect(config);
    const db = drizzle(connection);

    await db
      .insert(qrcodes)
      .values(qrcodesForEvents)
      .onDuplicateKeyUpdate({
        set: {
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      });

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("An error occured with creating tickets for an entry", e);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong. Please contact server admin.",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
