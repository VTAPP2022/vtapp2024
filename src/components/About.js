import React from "react";
import vitap from "../assets/vitap.webp";

function About() {
  return (
    <div id="about">
      <div className=" min-h-screen bg-black flex justify-center align-middle flex-col p-8">
        <div className="mt-10">
          <h1 className="text-5xl font-bold mb-2 text-white">About VTAPP</h1>
          <p className="py-2">
            Welcome to VTAPP 2022, VIT AP University’s annual technical fest.
            Join us in celebrating innovation, knowledge, technology, and
            diversity through a multitude of events which will give students a
            platform to showcase their learning and demonstrate their technical
            skills. This year’s theme is “The Matrix”. Much like how the body,
            the mind and the brain sync together to reflect power,
            individuality, and humanity in the matrix, at VTAPP, infrastructural
            facilities, students and ideas will come together to create magic.
          </p>
          <p>
            Embark on an experiential journey as we discover our potential and
            infinite opportunities in engineering.
          </p>
          <br />
          <p>Join us on 10-11 December 2022 at VIT AP</p>
          <br />
          <b>
            <i>
              <p>Where the mind is without fear and the head is held high</p>
              <br />
              <p>Where knowledge is free…</p>
            </i>
          </b>
        </div>
      </div>
    </div>
  );
}

export default About;
