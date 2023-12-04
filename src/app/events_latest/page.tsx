import EventList from "@vtapp/components/EventList";
import { AirtableEventResponse } from "@vtapp/types";

export const runtime = "edge";

async function getData() {
  const requiredFields = [
    "event_id",
    "event_name",
    "event_type",
    "price",
    "organiser",
    "description",
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
  const AIRTABLE_EVENTS_ENDPOINT = encodeURI(
    `${process.env.AIRTABLE_BASE_URL}/${process.env.AIRTABLE_BASE_ID}/events?view=Grid view&${requiredFieldsString}`
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
}

export default async function Events() {
  const eventsDataFromAirtable = await getData();

  return <EventList events={eventsDataFromAirtable} />;

  // return (
  //   <div>
  //     <section className="bg-slate-900 flex flex-col min-h-screen justify-center items-center">
  //       <div className=" px-6 py-10 mx-auto ">
  //         <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
  //           Events will be displayed soon..
  //         </h1>
  //       </div>
  //     </section>
  //   </div>
  // );
}
