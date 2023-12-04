import { TicketSearchParams } from "@vtapp/types";
import { fetchTicketDetails } from "@vtapp/lib/tickets";
import TicketView from "@vtapp/components/TicketView";

export const runtime = "edge";

export default async function TicketViewPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const eventsRegistered = await fetchTicketDetails(
    searchParams as unknown as TicketSearchParams
  );

  return <TicketView registeredEvents={eventsRegistered} />;
}
