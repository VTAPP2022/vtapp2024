export interface Event {
  event_id: string;
  organiser: string;
  event_name: string;
  event_type: string;
  description: string;
  price: string;
  poster_url: string;
  time: string;
  date: string;
  place: string;
  floor: string;
  room: string;
  admins: string[];
}

enum EventType {
  CODEATHON = "Codeathon",
  COMPETITION = "Competition",
  EXHIBITION = "Exhibition",
  GAME = "Game",
  WORKSHOP = "Workshop",
}

interface AirtableImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;

  // there are more fields but we don't need them
}

export interface AirtableEvent {
  event_id: number;
  event_name: string;
  event_type: EventType;
  price: number;
  organiser: string;
  description: string;
  slug: string;
  long_description: string;
  poster_url?: AirtableImage[];
  datetime_start?: string;
  datetime_end?: string;
  place?: string;
  floor?: string;
  room?: string;

  // there are more fields but we don't need them
}
interface AirtableEventRow {
  id: string;
  createdTime: string;
  fields: AirtableEvent;
}

interface AirtableEventResponse {
  records: AirtableEventRow[];
}

export type { EventType, AirtableEventResponse };
