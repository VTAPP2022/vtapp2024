"use server";

import { TicketSearchParams, EventsRegistered } from "@vtapp/types";
import { config, qrcodes } from "@vtapp/db";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { and, eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { fetchEventsFromAirtable } from "./events";

export async function fetchTicket(formData: FormData) {
  const applicationNumber = formData.get("applicationNumber");
  const dateOfBirth = formData.get("dateOfBirth");
  const captchaToken = formData.get("cf-turnstile-response");

  if (!applicationNumber || !dateOfBirth || !captchaToken) {
    return;
  }

  redirect(
    `/tickets/view?applicationNumber=${applicationNumber}&dateOfBirth=${dateOfBirth}&captchaToken=${captchaToken}`
  );
}

export async function fetchTicketDetails(applicantInfo: TicketSearchParams) {
  const { applicationNumber, dateOfBirth, captchaToken } = applicantInfo;

  if (!applicationNumber || !dateOfBirth || !captchaToken) {
    notFound();
  }

  // verify captchaToken
  const VERIFY_ENDPOINT =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const captchaResponse = await fetch(VERIFY_ENDPOINT, {
    method: "POST",
    body: `secret=${encodeURIComponent(
      process.env.CLOUDFLARE_TURNSTILE_SECRET
    )}&response=${encodeURIComponent(captchaToken)}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

  const captchaResponseJson = await captchaResponse.json();
  if (!captchaResponseJson.success) {
    notFound();
  }

  // change dateOfBirth to DD-MM-YYYY format
  const dateOfBirthArray = dateOfBirth.split("-");
  const dateOfBirthFormatted = `${dateOfBirthArray[2]}-${dateOfBirthArray[1]}-${dateOfBirthArray[0]}`;

  // fetch ticket details
  const connection = connect(config);
  const db = drizzle(connection);

  const eventsRegistered = (await db
    .select()
    .from(qrcodes)
    .where(
      and(
        eq(qrcodes.applicationNo, applicationNumber),
        eq(qrcodes.dateOfBirth, dateOfBirthFormatted)
      )
    )) as EventsRegistered[];

  // fetch event details from Airtable
  const eventsConfigured = await fetchEventsFromAirtable();

  // add event details to eventsRegistered
  eventsRegistered.forEach((eventRegistered) => {
    const event = eventsConfigured.find(
      (e) => e.event_id === eventRegistered.eventId
    );

    if (!event) {
      return;
    }

    eventRegistered.event = event;
  });

  return eventsRegistered
    .filter((e) => e.event)
    .sort((a, b) =>
      a.event.event_name.localeCompare(b.event.event_name)
    ) as EventsRegistered[];
}
