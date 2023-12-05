export const runtime = "edge";

import Hero from "@vtapp/components/Hero";
import EventCarousel from "@vtapp/components/EventCarousel";
import TeamAndSponsors from "@vtapp/components/TeamAndSponsors";
import TShirt from "@vtapp/components/TShirt";
import About from "@vtapp/components/About";
import RiveAnimation from "@vtapp/components/RiveAnimation";
import { fetchEventsFromAirtable } from "@vtapp/lib/events";

export default async function Home() {
  const events = await fetchEventsFromAirtable();

  return (
    <div>
      <Hero />
      <About />
      <RiveAnimation />
      <TeamAndSponsors />
      <EventCarousel events={events} />
      <TShirt />
    </div>
  );
}
