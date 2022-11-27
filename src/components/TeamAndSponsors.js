import React from "react";
import { Link } from "react-router-dom";

function TeamAndSponsors() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row align-middle justify-center items-center bg-gray-900">
      <div id="team">
        <div className="mx-auto p-10 lg:px-24 bg-gray-900 h-full">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold text-gray-50 mb-2">Team</h1>
            <br />
            <p className="text-xl  text-gray-200 mb-5">
              The teams of VTAPP are all picked to ensure maximum efficiency.
              Under Dr. Sibi Chakkaravarthy S, we have multiple teams all
              working for the sole purpose of succeeding in making this event a
              roaring success.
            </p>
            <br />
            <div>
              <Link className="rounded-md btn btn-primary" to="/team">
                Meet the Team
              </Link>
            </div>

            <br />
          </div>
        </div>
      </div>
      <div className="divider lg:divider-horizontal"></div>

      <div id="sponsors">
        <div className="mx-auto p-10 lg:px-24 bg-gray-900 h-full">
          <div className="flex flex-col ">
            <h1 className="text-5xl font-bold text-gray-50 mb-2">Sponsors</h1>
            <br />
            <p className="text-xl text-gray-200 mb-5">
              The sponsors have always been a big part of the growth of our
              fest. It gives us the freedom to truly bring a spectacular event
              to you all. The event would not be possible without you all, and
              we are thankful for the support given.
            </p>
            <br />
            <div>
              <Link className="rounded-md btn btn-primary" to="/sponsors">
                More..
              </Link>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamAndSponsors;
