import Hero from "@vtapp/components/Hero";
import EventCarousel from "@vtapp/components/EventCarousel";
import TeamAndSponsors from "@vtapp/components/TeamAndSponsors";
import TShirt from "@vtapp/components/TShirt";
import About from "@vtapp/components/About";
import RiveAnimation from "@vtapp/components/RiveAnimation";
import { Event } from "@vtapp/types";
import EventsData from "@vtapp/data/events_list.json";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <RiveAnimation />
      <TeamAndSponsors />
      {/* <EventCarousel events={EventsData as Event[]} /> */}
      <TShirt />
    </div>
  );
}
