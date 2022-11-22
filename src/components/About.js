import React from "react";
import vitap from "../assets/vitap.webp";

function About() {
  return (
    <div id="about">
      <div className=" min-h-screen bg-black flex justify-center align-middle flex-col p-8">
        <h1 className="text-5xl font-bold mb-6 mt-8 text-white">About VIT</h1>
        <div className="flex flex-col lg:flex-row">
          <img src={vitap} className="max-w-lg rounded-lg shadow-2xl" />

          <p className="p-4 ">
            Vellore Institute of Technology (VIT) is driven by a collective
            purpose: to improve life by applying knowledge and to develop a
            better world through education, research, and innovation. VIT has
            students from all the 29 states of India and more than 41 countries,
            because of its academic excellence. The curriculum is designed to
            enable students to think innovatively through applied learning
            practices. Fully Flexible Credit System (FFCS), Project Based
            Learning (PBL), fully digitized academic portals and Hackathons /
            Makeathons assist students in equipping themselves for 2020 job
            skills and kindle their interest and curiosity, thereby moulding
            them to be better problem solvers. VIT ensures that the
            Teaching-Learning process of the 8th module in every subject is
            handled by industry experts, wherein students contextualize the
            concepts in the classroom environment. The national and
            international clubs, chapters at VIT provide arenas to the students
            to think out of the box and excel in co-curricular and
            extra-curricular activities.
          </p>
        </div>

        <div className="mt-10">
          <h1 className="text-5xl font-bold mb-2 text-white">About VTAPP</h1>
          <p className="py-2">
            The infrastructural facilities along with a congenial atmosphere for
            learning enable all our students to excel in curricular and
            co-curricular activities. VIT has always been at the forefront and
            achieved several accolades across the globe and our journey, indeed,
            is long. VIT is aware that technological developments remarkably
            contribute to societal transformation. This is manifested during our
            annual techno-management fest VTAPP. VTAPP' 22 provides
            opportunities to ignite and innovate the young minds to demonstrate
            their technical skills. The theme of VTAPP 2019 is “Technology
            Driven Transformation” which intends to offer simple and novel
            solutions to the challenges faced by the common people. <br /> There are a
            plethora of events in VTAPP'19 covering almost every domain in
            emerging areas. To name a few, VIT-Model United Nations (VIT-MUN),
            The Rover Challenge, Drone League, Business idea competition, Social
            Transformers will emphasize the ethical and technological skills of
            the students. Also, the technical workshops and hands-on training
            sessions, VIT HACK [comprising of Make-a-Thon, Hack-a-Thon,
            Idea-a-Thon, Design-a-Thon, Chem-a-Thon] will technically entertain
            and enrich the students’ innovative skills. In addition to the
            events, we are hosting an International Conference on “Nano in
            Engineering, Science, and Technology (iNEST) and the accepted papers
            in the conference will be published in the form of proceedings/book
            chapters. We assure that this year’s technical extravaganza is
            certain to grab the attention of techno buffs and will provide a
            platform to showcase their academic excellence. All the engineering
            and science students of VIT and other institutes are expected to
            participate in this event.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
