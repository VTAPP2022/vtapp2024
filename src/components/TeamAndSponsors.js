import React from "react";

function TeamAndSponsors() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row align-middle justify-center items-center bg-gray-900">
      <div id="team">
        <div className="mx-auto p-10 lg:px-24 bg-gray-900 h-full">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-gray-50">Team</h1>
            <br />
            <p className="text-xl  text-gray-200">
              graVITas is an experience, full of amusement and learning. But
              creating this fascinating experience is no easy task. So here it
              is, an assemblage of extraordinary students and remarkable
              teachers, hand-picked by the organizing team, under the guidance
              of our Chancellor, Dr. G. Viswanathan, who went all out to define
              this experience to the best of their capabilities and define
              Asia's one of the biggest technical extravaganza.
            </p>
            <br />
            <div>
              <button className="rounded-md btn btn-primary">
                Meet the Team
              </button>
            </div>

            <br />
          </div>
        </div>
      </div>
      <div className="divider lg:divider-horizontal"></div>

      <div id="sponsors">
        <div className="mx-auto p-10 lg:px-24 bg-gray-900 h-full">
          <div className="flex flex-col ">
            <h1 className="text-5xl font-bold text-gray-50">Sponsors</h1>
            <br />
            <p className="text-xl text-gray-200">
              Vellore Institute of Technology has always strived towards
              ensuring the technical development of the society. graVITas,
              Asia's one of the largest technical fest, is one such initiative
              towards fulfilling this responsibility. And in this journey
              towards our goal, we have never been alone. Here are the many
              others, who share the same vision of a better future, and
              empowered us to make sure we present to the best that you deserve.
            </p>
            <br />
            <div>
              <button className="rounded-md btn btn-primary">
                More..
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamAndSponsors;
