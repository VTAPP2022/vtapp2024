import React, { forwardRef } from "react";
import { format } from "date-fns";
import range from "lodash/range";
import DatePicker from "react-datepicker";

const ButtonInput = forwardRef(({ value, onClick }, ref) => (
  <button
    onClick={onClick}
    ref={ref}
    type="button"
    className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500 cursor-pointer"
  >
    {format(new Date(value), "dd MMMM yyyy")}
  </button>
));

export const DateOfBirth = ({ setSelectedDate, selectedDate }) => {
  const years = range(1980, new Date().getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <DatePicker
      renderCustomHeader={({ date, changeYear, changeMonth }) => (
        <div classNames="m-10 flex">
          <select
            className="px-4 py-2 w-fit mr-4 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 w-fit rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700 justify-end mx-auto"
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      customInput={<ButtonInput />}
    />
  );
};
