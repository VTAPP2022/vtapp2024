"use server";

import { AirtableEventResponse } from "@vtapp/types";
import { notFound } from "next/navigation";

export async function fetchEventsFromAirtable() {
  try {
    const AIRTABLE_EVENTS_ENDPOINT = encodeURI(
      `${process.env.AIRTABLE_BASE_URL}/${process.env.AIRTABLE_BASE_ID}/events?view=Grid view`
    );

    const cacheOptions =
      process.env.NODE_ENV === "development"
        ? {
            next: { revalidate: 60 },
          }
        : { cache: "no-store" as RequestCache };

    const response = await fetch(AIRTABLE_EVENTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`,
      },
      ...cacheOptions,
    });

    const data = (await response.json()) as AirtableEventResponse;

    const events = data.records.map((record) => record.fields);

    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function findEventBySlug(slug: string) {
  const events = await fetchEventsFromAirtable();

  const event = events.find((event) => event.slug === slug);

  if (!event) {
    notFound();
  }

  return event;
}

export async function findEventById(eventId: number) {
  const events = await fetchEventsFromAirtable();

  const event = events.find((event) => event.event_id === eventId);

  if (!event) {
    notFound();
  }

  return event;
}