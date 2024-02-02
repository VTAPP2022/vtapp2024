import backgroundImg from "@vtapp/assets/hero-bg.png";
import CTA from "@vtapp/components/CTA";
import Image from "next/image";

function Hero() {
  return (
    <div
      className="heroContainer bg-transparent flex justify-center align-middle items-center py-7
      h-screen mt-[-80px]"
    >
      <div className="flex flex-col items-center justify-center h-screen">
        <Image
          src={backgroundImg}
          alt="vtapp logo"
          className="max-w-3xl mb-4 max-sm:max-w-sm"
        />
        <h2 className="text-3xl text-white font-bold max-sm:text-2xl">
          VTAPP International Tech Fest
        </h2>
        <p className="text-2xl textx-white font-bold">February 22 & 23 2024</p>
        {/* <p className="text-2xl textx-white font-bold text-center">VTAPP 2024 is postponed due to michaung cyclone <br /> dates will be announced shortly</p> */}
        <CTA />
      </div>
    </div>
  );
}

export default Hero;
