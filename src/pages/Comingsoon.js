import React from "react";

function Comingsoon() {
  return (
    <div>
      {/* coming soon page */}
      <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="w-full max-w-md px-4 py-8 bg-white border-2 border-gray-300 rounded-lg sm:px-10">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Coming Soon</h1>
            <p className="mt-2 text-sm text-gray-600">
              We're working hard to finish the development of this site. Our
              target launch date is <strong>November 29</strong>! follow our
              socilas to stay up to date with the latest news.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comingsoon;
