import React from "react";
import TeamCard from "../components/TeamCard";
import video from "../assets/video.mp4";
import NoimageCard from "../components/NoimageCard";

function Team() {
  return (
    <section className="bg-slate-900 flex flex-col">
      <div className="container px-6 py-10 mx-auto ">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          PATRON
        </h1>

        <div className="flex justify-center mx-auto mt-2">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard />
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto ">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          CO - PATRON
        </h1>

        <div className="flex justify-center mx-auto mt-2">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard />
          <TeamCard />
          <TeamCard />
          <TeamCard />
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto ">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">
          FACULTY ORGANIZING COMMITTEE
        </h1>

        <div className="flex justify-center mx-auto mt-2">
          <span className="inline-block w-80 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-8 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="flex flex-wrap justify-center mt-6">
          <NoimageCard />
          <NoimageCard />
          <NoimageCard />
        </div>
      </div>
    </section>
  );
}

export default Team;
