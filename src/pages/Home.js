import React from 'react'
import About from '../components/About';
import Events from '../components/Events';
import Hero from '../components/Hero';
import TeamAndSponsors from '../components/TeamAndSponsors';
import TShirt from '../components/TShirt';
import Comingsoon from './Comingsoon';

function Home() {
  return (
    <div>
      <Hero/>
      <About/>
      <Events/>
      <TeamAndSponsors/>
      <TShirt/>
    </div>
  );
}

export default Home