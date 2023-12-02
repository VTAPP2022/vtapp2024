"use client";

import StarfieldAnimation from "react-starfield-animation";

function BackgroundAnimation() {
  return (
    <StarfieldAnimation
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
      numParticles={1200}
    />
  );
}

export default BackgroundAnimation;
