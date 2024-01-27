import { useState } from "react";
import GoalForm from "../forms/GoalForm";
import Loading from "../global/Loading";
import Title from "../global/Title";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchGoalThunk } from "../../features/goalSlice";
import { fetchSummaryThunk } from "../../features/summarySlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

/* eslint-disable react/prop-types */
const EditGoalModal = ({ isOpen, onClose, goal }) => {
  // FETCHING DATA

  // HANDLE SUBMIT
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e, goalData) {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.put(`${url}/goal`, goalData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      const date = "";

      onClose();

      dispatch(fetchGoalThunk());
      dispatch(fetchSummaryThunk({ date }));

      navigate("/");

      Swal.fire({
        title: "Success!",
        text: `${data.message}`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }
  // CONDITION BUAT MODAL
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div
          className="fixed top-0 left-0 w-full h-full bg-blue-900 opacity-50"
          onClick={onClose}
        ></div>

        <div className="fixed bg-white w-3/6 h-5/6 rounded-3xl shadow-lg flex">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="p-10 w-full h-full mt-5">
                <Title text="Edit Goal" />
                <GoalForm handleSubmit={handleSubmit} goal={goal} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditGoalModal;
