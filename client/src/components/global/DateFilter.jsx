/* eslint-disable react/prop-types */
import monthGenerator from "../../helpers/monthGenerator";

const DateFilter = ({ onChange, date }) => {
  const months = monthGenerator();

  return (
    <>
      <div className="flex gap-3 items-center">
        <h1 className="font-bold">Month</h1>
        <select
          name="Month"
          className="font-bold p-2.5 px-6 rounded-full border-none max-md:py-2 max-md:text-xs max-md:px-4"
          onChange={onChange}
          defaultValue={date}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.text}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default DateFilter;
