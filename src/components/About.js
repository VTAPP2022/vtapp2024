import React from "react";
import HeaderInfo from "./HeaderInfo";

function About() {
  return (
    <div id="about">
      <div className=" min-h-screen bg-black flex justify-center align-middle flex-col p-8">
        <div className="mt-10">
          <h1 className="text-5xl font-bold mb-2 text-white">About VTAPP</h1>
          <p className="py-2">
            Welcome to VTAPP 2022! VIT AP University’s annual technical fest is
            back with a bang! Join us in celebrating innovation, knowledge,
            technology, and diversity through a multitude of events which will
            give students a platform to showcase their learning and demonstrate
            their technical skills. This year’s theme is “The Matrix”. Much like
            how the body, the mind and the brain sync together to reflect power,
            individuality, and humanity in the matrix, at VTAPP, infrastructural
            facilities, students and ideas will come together to create magic.
          </p>
          <p>
            Embark on an experiential journey as we discover our potential and
            infinite opportunities in engineering. With over 70+ events,
            workshops, activity stalls and tech shows as well as a prize pool of
            upto 20 lakh rupees, VTAPP is all set to become one of the biggest
            confluence of students in the region.
          </p>
          <br />
          <p>
            Mark your calendars and pack your bags to join us as we celebrate
            technology!{" "}
          </p>
          <br />
          <b>
            <p>When : 10-11 December 2022</p>
            <p>Where: VIT-AP University, Amaravati, Andhra Pradesh</p>
          </b>
        </div>
      </div>
    </div>
  );
}

export default About;
