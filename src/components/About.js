import React from "react";

function About() {
  return (
    <div id="about" className=" flex flex-wrap lg:flex-nowrap  min-h-screen items-center justify-evenly">
      <div className=" bg-black flex justify-center align-middle flex-col p-8 max-w-[900px]">
        <div className="mt-10">
          <h1 className="text-5xl font-bold mb-2 text-white">About VTAPP</h1>
          <p className="py-2">
            Welcome to VTAPP 2023! VIT AP University’s annual technical fest is
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
            <p>When : 9-10 December 2023</p>
            <p>Where: VIT-AP University, Amaravati, Andhra Pradesh</p>
          </b>
        </div>
      </div>
      <div className="flex justify-center items-center max-lg:mb-20">
        <img
          src="https://vitap.ac.in/wp-content/uploads/2021/07/Areal-View-Campus.jpeg"
          alt="vitap campus"
          className="rounded-3xl p-4 lg:max-w-[700px]"
        />
      </div>
    </div>
  );
}

export default About;
