/* eslint-disable react/prop-types */
import Title from "../global/Title";

const GoalChart = ({ summary }) => {
  return (
    <>
      <div className="p-10 w-1/2 max-md:w-full  bg-white bg-opacity-80 shadow-md rounded-2xl border border-white">
        <Title text="Your Progress" />

        <div className="flex items-center justify-between w-full mt-3 border overflow-hidden rounded-full border-indigo-500 text-indigo-500 h-[38px]">
          <div
            className="bg-indigo-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.shopping}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Shopping{" "}
            <span className="font-semibold">
              ({!summary?.shopping ? "no goal yet" : summary?.shopping + "%"})
            </span>
          </p>
        </div>

        <div className="flex items-center  justify-between w-full mt-3 border overflow-hidden rounded-full border-green-500 text-green-500 h-[38px]">
          <div
            className="bg-green-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.transportation}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Transportation{" "}
            <span className="font-semibold">
              (
              {!summary?.transportation
                ? "no goal yet"
                : summary?.transportation + "%"}
              )
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-3 border overflow-hidden rounded-full border-orange-500 text-orange-500 h-[38px]">
          <div
            className="bg-orange-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.food}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Food{" "}
            <span className="font-semibold">
              ({!summary?.food ? "no goal yet" : summary?.food + "%"})
            </span>
          </p>
        </div>

        <div className="flex items-center  justify-between w-full mt-3 border overflow-hidden rounded-full border-yellow-500 text-yellow-500 h-[38px]">
          <div
            className="bg-yellow-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.entertainment}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Entertainment{" "}
            <span className="font-semibold">
              (
              {!summary?.entertainment
                ? "no goal yet"
                : summary?.entertainment + "%"}
              )
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-3 border overflow-hidden rounded-full border-purple-500 text-purple-500 h-[38px]">
          <div
            className="bg-purple-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.bills}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Bills{" "}
            <span className="font-semibold">
              ({!summary?.bills ? "no goal yet" : summary?.bills + "%"})
            </span>
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-3 border overflow-hidden rounded-full border-red-500 text-red-500 h-[38px]">
          <div
            className="bg-red-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.health}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Health{" "}
            <span className="font-semibold">
              ({!summary?.health ? "no goal yet" : summary?.health + "%"})
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full mt-3 border overflow-hidden rounded-full border-blue-500 text-blue-500 h-[38px]">
          <div
            className="bg-blue-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.clothes || 0}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Clothes{" "}
            <span className="font-semibold">
              ({!summary?.clothes ? "no goal yet" : summary?.clothes + "%"})
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full mt-3 border overflow-hidden rounded-full border-teal-500 text-teal-500 h-[38px]">
          <div
            className="bg-teal-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.education || 0}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Education{" "}
            <span className="font-semibold">
              ({!summary?.education ? "no goal yet" : summary?.education + "%"})
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full mt-3 border overflow-hidden rounded-full border-pink-500 text-pink-500 h-[38px]">
          <div
            className="bg-pink-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.gift || 0}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Gift{" "}
            <span className="font-semibold">
              ({!summary?.gift ? "no goal yet" : summary?.gift + "%"})
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full mt-3 border overflow-hidden rounded-full border-fuchsia-500 text-fuchsia-500 h-[38px]">
          <div
            className="bg-fuchsia-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.savings || 0}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Savings{" "}
            <span className="font-semibold">
              ({!summary?.savings ? "no goal yet" : summary?.savings + "%"})
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full mt-3 border overflow-hidden rounded-full border-gray-500 text-gray-300 h-[38px]">
          <div
            className="bg-gray-300 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.other || 0}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-slate-800">
            Other{" "}
            <span className="font-semibold">
              ({!summary?.other ? "no goal yet" : summary?.other + "%"})
            </span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full mt-3 shadow-md overflow-hidden rounded-full  text-gray-300 h-[38px] bg-white">
          <div
            className="bg-gradient-to-r from-blue-400 to-rose-400 h-full text-white flex justify-start items-center text-xs rounded-r-full"
            style={{ width: `${summary?.total || 0}%` }}
          ></div>
          <p className="ml-5 absolute text-xs z-10 text-white font-semibold">
            Total{" "}
            <span className="font-bold">
              ({!summary?.total ? "no goal yet" : summary?.total + "%"})
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default GoalChart;
