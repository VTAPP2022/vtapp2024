import React from "react";
import EventCard from "../components/EventCard";

function Event() {
  return (
    <div>
      <section className="bg-slate-900 flex flex-col">
        <div className="container px-6 py-10 mx-auto ">
          <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
            Events
          </h1>

          <div className="flex justify-center mx-auto mt-2">
            <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
          </div>

          <div className="flex flex-wrap justify-center mt-6">
            <EventCard
              EventName="TechEden"
              EventDisc="Explore the artistic side of science with ChemDraw, create and visualize chemical structures, reactions, biological objects and pathways"
              Organizer="Open Source Community"
              Type="Hackathon"
              Price="20000"
              imgUrl="https://studentportal.vnit.ac.in/static/IMAGES/vnitnet_hackathon.png"
            />
            <EventCard
              EventName="TechEden"
              EventDisc="Explore the artistic side of science with ChemDraw, create and visualize chemical structures, reactions, biological objects and pathways"
              Organizer="Open Source Community"
              Type="Hackathon"
              Price="20000"
              imgUrl="https://studentportal.vnit.ac.in/static/IMAGES/vnitnet_hackathon.png"
            />
            <EventCard
              EventName="TechEden"
              EventDisc="Explore the artistic side of science with ChemDraw, create and visualize chemical structures, reactions, biological objects and pathways"
              Organizer="Open Source Community"
              Type="Hackathon"
              Price="20000"
              imgUrl="https://studentportal.vnit.ac.in/static/IMAGES/vnitnet_hackathon.png"
            />
            <EventCard
              EventName="TechEden"
              EventDisc="Explore the artistic side of science with ChemDraw, create and visualize chemical structures, reactions, biological objects and pathways"
              Organizer="Open Source Community"
              Type="Hackathon"
              Price="20000"
              imgUrl="https://studentportal.vnit.ac.in/static/IMAGES/vnitnet_hackathon.png"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;
