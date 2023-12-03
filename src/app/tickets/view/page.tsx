import {
  TicketSearchParams,
  AirtableEventResponse,
  EventsRegistered,
} from "@vtapp/types";
import { config, qrcodes } from "@vtapp/db";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { and, eq } from "drizzle-orm";
import TicketView from "@vtapp/components/TicketView";

export const runtime = "edge";

async function fetchTicketDetails(searchParams: URLSearchParams) {
  const { applicationNumber, dateOfBirth, captchaToken } =
    searchParams as unknown as TicketSearchParams;

  if (!applicationNumber || !dateOfBirth || !captchaToken) {
    throw new Error("Invalid search params");
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
    throw new Error("Invalid captcha");
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

  const eventIDs = eventsRegistered.map((event) => event.eventId);

  // fetch event details from Airtable
  const requiredFields = [
    "event_id",
    "event_name",
    "event_type",
    "price",
    "organiser",
    "poster_url",
    "datetime_start",
    "datetime_end",
    "place",
    "floor",
    "room",
  ];

  // make a string of required fields (fields[]=event_id&fields[]=event_name&...)
  const requiredFieldsString = requiredFields
    .map((field) => `fields[]=${field}`)
    .join("&");

  // find all events with event_id in eventIDs
  const filterByFormula = `OR(${eventIDs
    .map((eventID) => `event_id=${eventID}`)
    .join(",")})`;

  const AIRTABLE_EVENTS_ENDPOINT = encodeURI(
    `${process.env.AIRTABLE_BASE_URL}/${process.env.AIRTABLE_BASE_ID}/Events?view=Grid view&${requiredFieldsString}&filterByFormula=${filterByFormula}`
  );

  const response = await fetch(AIRTABLE_EVENTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
  });

  const data = (await response.json()) as AirtableEventResponse;

  // add event details to eventsRegistered
  eventsRegistered.forEach((eventRegistered) => {
    const event = data.records.find(
      (record) => record.fields.event_id === eventRegistered.eventId
    )?.fields;

    if (!event) {
      return;
    }

    eventRegistered.event = event;
  });

  return eventsRegistered as EventsRegistered[];
}

export default async function TicketViewPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const eventsRegistered = await fetchTicketDetails(searchParams);

  return <TicketView registeredEvents={eventsRegistered} />;
}
