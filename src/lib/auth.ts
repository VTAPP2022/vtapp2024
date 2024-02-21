import { fetchEventsFromAirtable } from "./events";
import { AdminInfoWithEvents } from "@vtapp/types";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
});

export async function fetchAdminDetails(
  session?: Session | null,
  fetchSession: boolean = true
): Promise<AdminInfoWithEvents> {
  if (fetchSession) {
    session = await auth();
  }

  if (!session || !session.user || !session.user.email) {
    return {
      events: [],
      user: undefined,
      isVitEmail: false,
    };
  }

  const emailAddress = session.user.email;

  if (
    !(
      emailAddress.endsWith("vitap.ac.in") ||
      emailAddress.endsWith("vitapstudent.ac.in")
    )
  ) {
    return {
      events: [],
      user: session.user,
      isVitEmail: false,
    };
  }

  const eventsFromAirtable = await fetchEventsFromAirtable(true);
  const events = eventsFromAirtable
    .filter((event) => {
      return event.admins
        .split(",")
        .map((adminEmail) => adminEmail.trim().toLowerCase())
        .includes(emailAddress.toLowerCase());
    })
    .sort((a, b) => a.event_name.localeCompare(b.event_name));

  return {
    events,
    user: session.user,
    isVitEmail: true,
  };
}
