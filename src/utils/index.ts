import { AirtableEvent } from "@vtapp/types";

export function getPosterUrl(event: AirtableEvent) {
  return event.poster_url && event.poster_url.length > 0
    ? event.poster_url[0].url
    : "https://i.imgur.com/2jzM0wr.jpg";
}
