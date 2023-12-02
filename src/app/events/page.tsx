import EventsData from "@vtapp/data/events_list.json";
import EventList from "@vtapp/components/EventList";

export default function Events() {
  //   return <EventList events={EventsData} />;

  return (
    <div>
      <section className="bg-slate-900 flex flex-col min-h-screen justify-center items-center">
        <div className=" px-6 py-10 mx-auto ">
          <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
            Events will be displayed soon..
          </h1>
        </div>
      </section>
    </div>
  );
}
