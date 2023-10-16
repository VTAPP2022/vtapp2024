import React from "react";
import logobw from "../assets/image 6.png";
import StarfieldAnimation from "react-starfield-animation";

function Hero() {
  return (
    <>
      <div className="canvas">
        <StarfieldAnimation
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
          numParticles={1200}
        />
      </div>
      <div
        className="heroContainer bg-transparent flex justify-center align-middle items-center py-7
      h-screen relative z-10"
      >
        <div className="flex flex-col items-center justify-center h-screen z-20  ">
          <img src={logobw} alt="vtapp logo" className="max-w-3xl mb-4 w-3/4" />
          <h2 className="text-3xl text-white font-bold	">
            International Tech Fest
          </h2>
          <p className="text-2xl text-white font-bold">December 10 & 11</p>
        </div>
      </div>
    </>
  );
}

export default Hero;
