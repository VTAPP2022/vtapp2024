import React from "react";
import About from "../components/About";
import EventView from "../components/EventView";
import HeaderInfo from "../components/HeaderInfo";
import Hero from "../components/Hero";
import TeamAndSponsors from "../components/TeamAndSponsors";
import TShirt from "../components/TShirt";

function Home({ events }) {
  return (
    <div>
      <Hero />
      <HeaderInfo/>
      <About />
      <EventView events={events} />
      <TeamAndSponsors />
      <TShirt />
    </div>
  );
}

export default Home;
