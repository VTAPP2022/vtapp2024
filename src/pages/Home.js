import React from "react";
import About from "../components/About";
import EventView from "../components/EventView";
import Hero from "../components/Hero";
import TeamAndSponsors from "../components/TeamAndSponsors";
import TShirt from "../components/TShirt";
import RiveAnimation from "../components/RiveAnimation";

function Home({ events }) {
  return (
    <div>
      <Hero />
      <About />
      <RiveAnimation />
      <EventView events={events} />
      <TeamAndSponsors />
      <TShirt />
    </div>
  );
}

export default Home;
