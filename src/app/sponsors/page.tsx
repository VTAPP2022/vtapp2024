import SponsorsData from "@vtapp/data/sponsors.json";
import Image from "next/image";

interface Sponsor {
  imgurl: string;
  whiteBG: boolean;
}

function Card({ imgurl, whiteBG }: Sponsor) {
  return (
    <div>
      <div
        className={`h-[200px] w-[350px] overflow-hidden text-center m-[35px] rounded-xl ${
          whiteBG === true ? `bg-white` : `bg-gray-900`
        }`}
      >
        <div className="h-full w-full flex justify-center align-center">
          <Image
            className="p-2 m-auto w-9/12 max-w-xs h-auto"
            src={imgurl}
            alt="vtapp sponsorer logo"
            width={350}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

function Sponsors() {
  return (
    <>
      <div id="Sponsors" className="bg-black text-center">
        <br />
        <br />
        <br />
        <span className="text-blue-500 leading-tight mt-20 mb-40 text-3xl sm:text-5xl lg:text-6xl font-bold ">
          Our Sponsors
        </span>
        <br />
        <br />
        <div className="p-2.5">
          <div className="flex flex-wrap justify-center align-center">
            {SponsorsData.slice(0, SponsorsData.length).map((card) => (
              <Card
                imgurl={card.imgurl}
                whiteBG={card.whiteBG}
                key={card.imgurl}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sponsors;
