import { fetchAdminDetails } from "@vtapp/lib/auth";
import EventList from "@vtapp/components/EventList";

export const runtime = "edge";

export default async function AdminEvents() {
  const adminDetails = await fetchAdminDetails();

  return (
    <>
      <EventList events={adminDetails.events} admin={adminDetails} />
    </>
  );
}
