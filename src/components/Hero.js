import React from "react";
import BigBangStarField from "react-big-bang-star-field";
import logo from "../assets/image 6.png";
import bg1 from "../assets/bg1.jpg";
import logobw from "../assets/vtappnewlogo.svg";
import video from "../assets/video.mp4";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div
      className="heroContainer bg-gray-900 flex justify-center align-middle items-center py-7
      h-screen relative z-10"
    >
      <div className="herobg absolute top-0 right-0 bottom-0 left-0 w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          src={video}
          className="w-full h-full object-cover"
        ></video>
      </div>

      <div className="flex flex-col items-center justify-center h-screen z-20  ">
        <img src={logobw} alt="vtapp logo" className="max-w-3xl mb-4 w-3/4" />
        <h2 className="text-3xl text-white font-bold	">
          International Tech Fest
        </h2>
        <p className="text-2xl text-white font-bold">December 10 & 11</p>
        <Link
          className="relative flex h-9  items-center justify-center p-4 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max mt-5"
          to="/tickets"
        >
          <span class="relative text-lg font-semibold text-gray-800">
            Grab Tickets
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
