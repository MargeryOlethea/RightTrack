import { useDispatch } from "react-redux";
import Title from "../global/Title";
import { useState } from "react";
import Loading from "../global/Loading";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchSpendingsThunk } from "../../features/spendingsSlice";
import SpendingForm from "../forms/SpendingForm";

/* eslint-disable react/prop-types */
const CreateModal = ({ isOpen, onClose }) => {
  //HANDLE CREATE
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const search = "";
  const sort = "newest";
  const filter = "";
  const date = "";

  async function handleSubmit(e, spendingData) {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(`${url}/userspendings`, spendingData, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      onClose();

      dispatch(fetchSpendingsThunk({ search, sort, filter, date }));

      navigate("/my-spending");

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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
      <div
        className="fixed top-0 left-0 w-full h-full bg-blue-900 opacity-50"
        onClick={onClose}
      ></div>

      <div className="fixed bg-white w-2/6 h-4/6 rounded-3xl shadow-lg flex || max-xl:w-1/2">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="p-10 w-full h-full mt-5">
              <Title text="New Spending" />
              <SpendingForm handleSubmit={handleSubmit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
