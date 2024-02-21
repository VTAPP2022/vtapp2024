import TurnstileCaptcha from "@vtapp/components/Turnstile";
import { fetchTicket } from "@vtapp/lib/tickets";

export const runtime = "edge";

export default function Tickets() {
  return (
    <>
      <form
        action={fetchTicket}
        className="flex flex-col h-fit py-20 bg-gray-900"
      >
        <div className="xl:w-96 mx-auto">
          <label
            htmlFor="applicationNumber"
            className="form-label inline-block mb-2 text-white text-lg text-center w-full"
          >
            Application number
          </label>
          <input
            type="text"
            className="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:outline-none z-10 relative
            "
            id="applicationNumber"
            name="applicationNumber"
            placeholder="VTAP2XXXXX"
            required
          />
        </div>

        <div className="mt-5 mx-auto flex flex-col items-center">
          <label
            htmlFor="dateOfBirth"
            className="form-label inline-block mb-2 text-white text-lg text-center w-full"
          >
            Date of Birth
          </label>
          <input
            type="date"
            className="z-10 p-1 border rounded-sm border-solid border-gray-300 transition ease-in-out text-gray-700 focus:outline-none text-center w-full"
            id="dateOfBirth"
            name="dateOfBirth"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
          />
        </div>

        <div className="mt-5 mx-auto">{/* <TurnstileCaptcha /> */}</div>

        <div className="mt-5 mx-auto">
          <input
            type="submit"
            value="Grab my ticket!"
            className="inline-block bg-blue-300 disabled:bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-700 rounded-md relative z-10 cursor-pointer"
          />
        </div>
      </form>
    </>
  );
}
