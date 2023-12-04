import Image from "next/image";

const TShirt = () => {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            T - SHIRTS
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600">
            {/* 2 lines about the event merch */}
            Get your own T-shirt and show your support for the event.
          </p>
        </div>

        <div className="flex justify-evenly mt-20 flex-col lg:flex-row flex-wrap gap-10">
          <div className="max-w-md relative group  hover:cursor-pointer">
            <div className="overflow-hidden aspect-w-1 aspect-h-1">
              <Image
                className="object-cover w-full aspect-[16/9] transition-all duration-300 group-hover:scale-125 group-hover:cursor-pointer"
                src="https://i.imgur.com/q5hiOgX.jpg"
                alt="collared vtapp tshirt"
                height={500}
                width={500}
              />
            </div>
            <div className="absolute left-3 top-3">
              <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">
                New
              </p>
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
              <div>
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  <div title="">
                    Collared T-Shirt
                    <br />
                    Lacoste Fabric (High end Cotton fabric)
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                  </div>
                </h3>
              </div>

              {/* <div className="text-right">
                <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                  ₹ 275
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TShirt;
