import React from "react";

function TeamCard() {
  return (
    <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700 max-w-xs m-4">
      <img
        className="object-cover w-full rounded-xl aspect-square"
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt=""
      />

      <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">
        arthur melo
      </h1>

      <p className="mt-2 text-gray-500 capitalize dark:text-gray-300">
        design director
      </p>
    </div>
  );
}

export default TeamCard;
