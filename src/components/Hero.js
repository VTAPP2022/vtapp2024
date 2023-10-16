import React from "react";
import logobw from "../assets/sw1.png";
import Buttons from "./Buttons";

function Hero() {
  return (
    <div
      className="heroContainer bg-transparent flex justify-center align-middle items-center py-7
      h-screen relative z-10 mt-[-80px]"
    >
      <div className="flex flex-col items-center justify-center h-screen z-20  ">
        <img src={logobw} alt="vtapp logo" className="max-w-3xl mb-4 " />
        <h2 className="text-3xl text-white font-bold	">
          VTAPP International Tech Fest
        </h2>
        <p className="text-2xl textx-white font-bold">December 9 & 10</p>
        <Buttons />
      </div>
    </div>
  );
}

export default Hero;
