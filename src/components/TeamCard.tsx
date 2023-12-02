import Image from "next/image";
import type { TeamMemberDetails } from "@vtapp/types";

function TeamCard({ photo, name, designation }: TeamMemberDetails) {
  return (
    <div className="flex flex-col items-center p-4 border sm:p-6 rounded-xl dark:border-gray-700 max-w-xs m-4">
      <Image
        className="object-cover w-full rounded-xl aspect-square object-top"
        src={photo}
        alt={name}
        width={300}
        height={300}
      />

      <h1 className="mt-4 text-2xl font-semibold capitalize text-white text-center">
        {name}
      </h1>

      <p className="mt-2 text-white text-lg capitalize">{designation}</p>
    </div>
  );
}

export default TeamCard;
