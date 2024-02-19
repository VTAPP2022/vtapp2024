import {
  CheckInInput,
  CheckInStatusCode,
  QRCodeRowManualDrizzle,
} from "@vtapp/types";
import { db, qrcodes } from "@vtapp/db";
import { fetchAdminDetails, auth } from "@vtapp/lib/auth";
import { eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export const runtime = "edge";

// @ts-expect-error
export const POST: (req: NextRequest) => Promise<Response> = auth(
  async (request) => {
    try {
      const { events, user, isVitEmail } = await fetchAdminDetails(
        request.auth,
        false
      );

      if (!user) {
        return new Response(
          JSON.stringify({
            success: false,
            code: CheckInStatusCode.UNAUTHORIZED,
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
            code: CheckInStatusCode.FORBIDDEN,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 403,
            statusText: "Forbidden - Not a VIT login.",
          }
        );
      }

      const body = (await request.json()) as CheckInInput;
      const { ticketId } = body;

      if (events.length === 0) {
        return new Response(
          JSON.stringify({
            success: false,
            code: CheckInStatusCode.FORBIDDEN,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 403,
            statusText: "Forbidden - You are not an admin for any event.",
          }
        );
      }

      const response = await db.transaction(async (tx) => {
        const ticketExists = await tx.execute(
          sql<QRCodeRowManualDrizzle>`SELECT * FROM ${qrcodes} WHERE ${qrcodes.id} = ${ticketId} FOR UPDATE`
        );

        if (ticketExists.rows.length !== 1) {
          return new Response(
            JSON.stringify({
              success: false,
              code: CheckInStatusCode.INVALID_TICKET,
            }),
            {
              headers: { "Content-Type": "application/json" },
              status: 400,
              statusText: "Bad Request - Invalid Ticket.",
            }
          );
        }

        const ticket = ticketExists
          .rows[0] as unknown as QRCodeRowManualDrizzle;

        const event = events.find((e) => e.event_id === ticket.event_id);

        if (!event) {
          return new Response(
            JSON.stringify({
              success: false,
              code: CheckInStatusCode.FORBIDDEN,
            }),
            {
              headers: { "Content-Type": "application/json" },
              status: 403,
              statusText: "Forbidden - You are not an admin for this event.",
            }
          );
        }

        if (ticket.qrcode_expired || ticket.scanned_at || ticket.scanned_by) {
          return new Response(
            JSON.stringify({
              success: false,
              code: CheckInStatusCode.ALREADY_CHECKED_IN,
              details: {
                scannedAt: ticket.scanned_at,
                scannedBy: ticket.scanned_by,
              },
            }),
            {
              headers: { "Content-Type": "application/json" },
              status: 409,
              statusText: "Conflict - Ticket already scanned.",
            }
          );
        }

        await tx
          .update(qrcodes)
          .set({
            scannedAt: new Date(),
            scannedBy: user.email,
            qrcodeExpired: true,
          })
          .where(eq(qrcodes.id, ticketId));

        return new Response(
          JSON.stringify({
            success: true,
            code: CheckInStatusCode.SUCCESS,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 200,
            statusText: "OK",
          }
        );
      });

      return response;
    } catch (e) {
      console.error("An error occured with scanning ticket", e);
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
);
