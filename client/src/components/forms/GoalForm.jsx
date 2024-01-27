/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ButtonColor from "../global/ButtonColor";

const GoalForm = ({ handleSubmit, goal }) => {
  const [goalData, setGoalData] = useState({
    shopping: 0,
    food: 0,
    entertainment: 0,
    clothes: 0,
    education: 0,
    savings: 0,
    transportation: 0,
    bills: 0,
    health: 0,
    gift: 0,
    other: 0,
  });

  useEffect(() => {
    if (goal) {
      setGoalData({
        shopping: goal?.shopping,
        food: goal?.food,
        entertainment: goal?.entertainment,
        clothes: goal?.clothes,
        education: goal?.education,
        savings: goal?.savings,
        transportation: goal?.transportation,
        bills: goal?.bills,
        health: goal?.health,
        gift: goal?.gift,
        other: goal?.other,
      });
    }
  }, [goal]);

  function inputData(field, e) {
    let value = e.target.value;

    setGoalData({ ...goalData, [field]: +value ?? 0 });
  }

  console.log(goalData);

  return (
    <>
      <form className="mt-5 w-full" onSubmit={(e) => handleSubmit(e, goalData)}>
        <div className="flex gap-5 w-full max-lg:flex-wrap">
          {/* INI KIRI */}
          <div className="w-1/2 max-lg:w-full">
            {/* shopping */}
            <div className="w-full">
              <p className="text-xs font-bold">Shopping</p>
              <input
                onChange={(e) => {
                  inputData("shopping", e);
                }}
                value={goalData.shopping}
                type="number"
                name="shopping"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* food */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Food</p>
              <input
                onChange={(e) => {
                  inputData("food", e);
                }}
                value={goalData.food}
                type="number"
                name="food"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* entertainment */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Entertainment</p>
              <input
                onChange={(e) => {
                  inputData("entertainment", e);
                }}
                value={goalData.entertainment}
                type="number"
                name="entertainment"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* clothes */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Clothes</p>
              <input
                onChange={(e) => {
                  inputData("clothes", e);
                }}
                value={goalData.clothes}
                type="number"
                name="clothes"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* education */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Education</p>
              <input
                onChange={(e) => {
                  inputData("education", e);
                }}
                value={goalData.education}
                type="number"
                name="education"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* savings */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Savings</p>
              <input
                onChange={(e) => {
                  inputData("savings", e);
                }}
                value={goalData.savings}
                type="number"
                name="savings"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>
          </div>

          {/* INI KANAN */}
          <div className="w-1/2 max-lg:w-full">
            {/* transportation */}
            <div>
              <p className="text-xs font-bold">Transportation</p>
              <input
                onChange={(e) => {
                  inputData("transportation", e);
                }}
                value={goalData.transportation}
                type="number"
                name="transportation"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* bills */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Bills</p>
              <input
                onChange={(e) => {
                  inputData("bills", e);
                }}
                value={goalData.bills}
                type="number"
                name="bills"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* health */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Health</p>
              <input
                onChange={(e) => {
                  inputData("health", e);
                }}
                value={goalData.health}
                type="number"
                name="health"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* gift */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Gift</p>
              <input
                onChange={(e) => {
                  inputData("gift", e);
                }}
                value={goalData.gift}
                type="number"
                name="gift"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>

            {/* other */}
            <div className="w-full mt-3">
              <p className="text-xs font-bold">Other</p>
              <input
                onChange={(e) => {
                  inputData("other", e);
                }}
                value={goalData.other}
                type="number"
                name="other"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
              />
            </div>
            <div className="mt-8 flex justify-end">
              <ButtonColor text="submit" className="w-3/6" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default GoalForm;
