"use server";

import { AirtableEventResponse } from "@vtapp/types";
import { notFound } from "next/navigation";

export async function fetchEventsFromAirtable(include_admin_info = false) {
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

    if (!include_admin_info) {
      events.forEach((event) => {
        delete event.update_link;
      });
    }

    // random sort to avoid the same event being at the top of the list every time
    events.sort(() => Math.random() - 0.5);

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

export async function findEventById(sdcId: number) {
  const events = await fetchEventsFromAirtable();

  const event = events.find(
    (event) =>
      event.sdc_id && event.sdc_id.split(",").map(parseInt).includes(sdcId)
  );

  if (!event) {
    notFound();
  }

  return event;
}
