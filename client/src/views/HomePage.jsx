/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummaryThunk } from "../features/summarySlice";
import rupiah from "../helpers/priceConverter";
import { Link } from "react-router-dom";
import { fetchGoalThunk } from "../features/goalSlice";
import Title from "../components/global/Title";
import ButtonColor from "../components/global/ButtonColor";
import GoalRecap from "../components/homePage/GoalRecap";
import GoalChart from "../components/homePage/GoalChart";
import SpendingChart from "../components/homePage/SpendingChart";
import SpendingSummary from "../components/homePage/SpendingSummary";
import DateFilter from "../components/global/DateFilter";
import CreateGoalModal from "../components/modals/CreateGoalModal";
import Loading from "../components/global/Loading";
import EditGoalModal from "../components/modals/EditGoalModal";
import RightTrack from "../components/global/RightTrack";

const HomePage = () => {
  const username = localStorage.username;

  // fetching data
  const dispatch = useDispatch();
  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
  } = useSelector((state) => state.summary);

  const {
    goal,
    loading: goalLoading,
    error: goalError,
  } = useSelector((state) => state.goal);

  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(fetchGoalThunk());
  }, []);

  useEffect(() => {
    dispatch(fetchSummaryThunk({ date }));
  }, [date]);

  function handleMonthFilter(e) {
    setDate(e.target.value);
  }

  // handling create goal modal
  const [isCreateGoalModalOpen, setCreateGoalModalOpen] = useState(false);
  const openCreateGoalModal = () => {
    setCreateGoalModalOpen(true);
  };
  const closeCreateGoalModal = () => {
    setCreateGoalModalOpen(false);
  };

  // handling edit goal modal
  const [isEditGoalModalOpen, setEditGoalModalOpen] = useState(false);
  const openEditGoalModal = () => {
    setEditGoalModalOpen(true);
  };
  const closeEditGoalModal = () => {
    setEditGoalModalOpen(false);
  };

  return (
    <>
      <div className="m-10 mt-16">
        {summaryLoading || goalLoading ? (
          <div className="w-screen h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <div className="p-10 w-full bg-white bg-opacity-80 shadow-md rounded-2xl border border-white flex justify-between items-center max-md:flex-wrap">
              <div>
                <h1 className="text-slate-800 font-extrabold text-4xl mb-2">
                  Hello{" "}
                  <Link to="/my-spending">
                    <span className="font-extrabold transition-all ease-in-out duration-500 hover:bg-gradient-to-r hover:text-transparent hover:from-rose-500 hover:to-blue-500 hover:bg-clip-text max-md:bg-gradient-to-r max-md:text-transparent max-md:from-rose-500 max-md:to-blue-500 max-md:bg-clip-text">
                      {" "}
                      {username}!
                    </span>
                  </Link>
                </h1>
                {!goal?.goal && (
                  <div className="flex-col items-center gap-3 mt-3">
                    <p className="text-sm">
                      You haven't created your goal yet!
                    </p>
                    <ButtonColor
                      text="create here!"
                      className="mt-2"
                      onClick={() => openCreateGoalModal()}
                    />
                  </div>
                )}
                {goal?.goal && (
                  <div>
                    <p className="mt-5 text-slate-800 ">
                      <span className="font-bold">
                        {100 - summary?.summaryPerGoal?.total}% to goal?{" "}
                      </span>{" "}
                      See exactly where to spend less with <RightTrack />
                      's insights.
                    </p>
                  </div>
                )}
              </div>

              <div className="max-md:mt-5">
                <DateFilter onChange={handleMonthFilter} date={date} />
                {summary && (
                  <p className="text-slate-800 mt-5">
                    Your spendings :{" "}
                    <span className="font-bold text-rose-700 text-lg">
                      {rupiah(summary?.totalSpending?.total)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            {/* CREATE GOAL MODAL */}
            <CreateGoalModal
              isOpen={isCreateGoalModalOpen}
              onClose={closeCreateGoalModal}
            />

            {/* EDIT GOAL MODAL */}
            <EditGoalModal
              isOpen={isEditGoalModalOpen}
              onClose={closeEditGoalModal}
              goal={goal?.goal}
            />

            {/* BARIS 2 */}
            {goal?.goal && !goalError && (
              <div className="flex gap-10 mt-10 max-md:flex-wrap">
                {/* ISI GOAL */}
                <GoalRecap goal={goal} openEdit={openEditGoalModal} />
                <GoalChart summary={summary.summaryPerGoal} />
              </div>
            )}

            {/* BARIS 3 */}
            <div className="flex gap-10 mt-10 max-md:flex-wrap">
              {/* CHART */}
              <div className="max-md:w-full max-xl:w-1/2 p-10 w-2/6 bg-white bg-opacity-80 shadow-md rounded-2xl border border-white">
                <Title text="Your Chart" />
                <SpendingChart spending={summary.totalSpending} />
              </div>

              {/* ISI SPENDING */}
              <div className="max-md:w-full max-xl:w-1/2 p-10 w-4/6 bg-white bg-opacity-80 shadow-md rounded-2xl border border-white">
                <Title text="Your Spending" />
                <SpendingSummary spending={summary.totalSpending} />
              </div>
            </div>
          </>
        )}
        {/* BARIS 1 */}
      </div>
    </>
  );
};

export default HomePage;
