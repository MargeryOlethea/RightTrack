/* eslint-disable react/prop-types */
import rupiah from "../../helpers/priceConverter";
import ButtonWhite from "../global/ButtonWhite";
import Title from "../global/Title";

const GoalRecap = ({ goal, openEdit }) => {
  return (
    <>
      <div className="p-10 w-1/2 max-md:w-full bg-white bg-opacity-80 shadow-md rounded-2xl border border-white text-xs">
        <div className="flex justify-between">
          <Title text="Your Goal" />
          <ButtonWhite
            text="Edit goal"
            className="bg-white"
            onClick={() => {
              openEdit();
            }}
          />
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-indigo-500 text-indigo-500 ">
          <span>Shopping</span>
          <span className="font-bold">{rupiah(goal?.goal?.shopping)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-green-500 text-green-500 ">
          <span>Transportation</span>
          <span className="font-bold">
            {rupiah(goal?.goal?.transportation)}
          </span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-orange-500 text-orange-500 ">
          <span>Food</span>
          <span className="font-bold">{rupiah(goal?.goal?.food)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-yellow-500 text-yellow-500 ">
          <span>Entertainment</span>
          <span className="font-bold">{rupiah(goal?.goal?.entertainment)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-purple-500 text-purple-500 ">
          <span>Bills</span>
          <span className="font-bold">{rupiah(goal?.goal?.bills)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-red-500 text-red-500 ">
          <span>Health</span>
          <span className="font-bold">{rupiah(goal?.goal?.health)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-blue-500 text-blue-500 ">
          <span>Clothes</span>
          <span className="font-bold">{rupiah(goal?.goal?.clothes)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-teal-500 text-teal-500 ">
          <span>Education</span>
          <span className="font-bold">{rupiah(goal?.goal?.education)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-pink-500 text-pink-500 ">
          <span>Gift</span>
          <span className="font-bold">{rupiah(goal?.goal?.gift)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-fuchsia-500 text-fuchsia-500 ">
          <span>Savings</span>
          <span className="font-bold">{rupiah(goal?.goal?.savings)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-gray-500 text-gray-500 ">
          <span>Other</span>
          <span className="font-bold">{rupiah(goal?.goal?.other)}</span>
        </div>

        <div className="flex justify-between w-full mt-3 shadow-md px-5 py-2.5 rounded-full text-slate-500 bg-white">
          <span className="font-bold">Total</span>
          <span className="font-extrabold">{rupiah(goal?.goal?.total)}</span>
        </div>
      </div>
    </>
  );
};

export default GoalRecap;
