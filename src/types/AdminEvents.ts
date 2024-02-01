import { AirtableEvent } from ".";

interface LogoutFlag {
  isVitEmail: boolean;
}

export interface AdminInfo {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

export interface AdminInfoWithEvents extends LogoutFlag {
  user?: AdminInfo;
  events: AirtableEvent[];
}
