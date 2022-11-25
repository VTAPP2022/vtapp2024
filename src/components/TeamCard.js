import React from "react";

function TeamCard({ imageUrl, name, designation }) {
  return (
    <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700 max-w-xs m-4">
      <img
        className="object-cover w-full rounded-xl aspect-square"
        src={imageUrl}
        alt={name}
      />

      <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
        {name}
      </h1>

      <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
        {designation}
      </p>
    </div>
  );
}

export default TeamCard;
