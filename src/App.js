import AppHeader from "./components/AppHeader";
import { Footer } from "./components/Footer";
import Team from "./pages/Team";
import Event from "./pages/Event";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { EventDetail } from "./pages/EventDetail";
import { Ticket } from "./pages/Ticket";
import Sponsors from "./pages/Sponsors";
import { QRScan } from "./pages/QRScan";
import Schedule from "./components/Schedule";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const sortEvents = (eventsL) => {
    eventsL.sort(() => 0.5 - Math.random()).slice(0, eventsL.length);
    return eventsL;
  };

  useEffect(() => {
    if (isLoading) {
      fetch(`${process.env.PUBLIC_URL}/data/events_list.json`).then((resp) =>
        resp.json().then((data) => {
          setEvents(sortEvents(data));
        })
      );
      setLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="bg-black min-h-screen scroll-smooth">
      <BrowserRouter>
        <ScrollToTop />
        <AppHeader />

        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/events" element={<Event events={events} />} />
          <Route path="/events/:id" element={<EventDetail events={events} />} />
          <Route path="/team" element={<Team />} />
          <Route path="/tickets" element={<Ticket events={events} />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/qrscan" element={<QRScan events={events} />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
