import { AirtableEventsEmbed } from "@vtapp/components/AirtableEventsEmbed";

function Schedule() {
  return (
    <>
      <section className="bg-slate-900 flex flex-col">
        <div className="container px-6 py-10 mx-auto ">
          <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
            Schedule
          </h1>
          <div className="flex justify-center mx-auto mt-2">
            <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
          </div>

          <div className="flex flex-wrap justify-center mt-6">
            <AirtableEventsEmbed />
          </div>
        </div>
      </section>
    </>
  );
}

export default Schedule;
