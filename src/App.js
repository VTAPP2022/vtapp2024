import AppHeader from "./components/AppHeader";
import { Footer } from "./components/Footer";
import Comingsoon from "./pages/Comingsoon";
import Team from "./pages/Team";
import Event from "./pages/Event";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { authApp } from "./utils/auth";
import { firestore } from "./utils/firestore";
import { setDoc, doc } from "firebase/firestore";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { EventDetail } from "./pages/EventDetail";
import { Ticket } from "./pages/Ticket";

function App() {
  const [user, setUser] = useState(authApp.currentUser);
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const sortEvents = (eventsL) => {
    eventsL.sort(() => 0.5 - Math.random()).slice(0, eventsL.length);
    return eventsL;
  };

  useEffect(() => {
    const unsubscribeAuthChanges = onAuthStateChanged(
      authApp,
      (loggedInUser) => {
        if (loggedInUser) {
          const userDoc = {
            email: loggedInUser.email,
            name: loggedInUser.displayName,
            photoUrl: loggedInUser.photoURL,
          };
          console.log({ uid: loggedInUser.uid, ...userDoc });

          setDoc(doc(firestore, "users", loggedInUser.uid), userDoc).catch(
            (error) => {
              console.error(error);
            }
          );
        }
        setUser(loggedInUser);
      }
    );
    if (isLoading) {
      fetch(`${process.env.PUBLIC_URL}/data/events_list.json`).then((resp) =>
        resp.json().then((data) => {
          setEvents(sortEvents(data));
        })
      );
      setLoading(false);
    }

    return unsubscribeAuthChanges;
  }, [isLoading]);

  return (
    <div className="bg-black min-h-screen scroll-smooth">
      <BrowserRouter>
        <ScrollToTop />
        <AppHeader currentUser={user} />
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/events" element={<Event events={events} />} />
          <Route path="/events/:id" element={<EventDetail events={events} />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Comingsoon />} />
          <Route path="/tickets" element={<Ticket events={events} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
