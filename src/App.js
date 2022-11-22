import About from "./components/About";
import AppHeader from "./components/AppHeader";
import Hero from "./components/Hero";
import Events from "./components/Events";
import TeamAndSponsors from "./components/TeamAndSponsors";
import TShirt from "./components/TShirt";
import { Footer } from "./components/Footer";
import Comingsoon from "./pages/Comingsoon";
import Team from "./pages/Team";

import { BrowserRouter,Routes, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";



function App() {
  return (
    <div className="bg-black min-h-screen scroll-smooth">
      {/* <AppHeader />
      <Hero/>
      <About/>
      <Events/>
      <TeamAndSponsors/>
      <TShirt/>
      <Comingsoon/>
      <Footer/> */}

      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Comingsoon />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Comingsoon />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
