import { useDispatch, useSelector } from "react-redux";
import Title from "../global/Title";
import { useEffect, useState } from "react";
import Loading from "../global/Loading";
import SpendingForm from "../forms/SpendingForm";
import { fetchSpendingIdThunk } from "../../features/spendingIdSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchSpendingsThunk } from "../../features/spendingsSlice";

/* eslint-disable react/prop-types */
const EditModal = ({ isOpen, onClose, id }) => {
  // AMBIL DATA

  const { spendingId, loading: spendingIdLoading } = useSelector(
    (state) => state.spendingId,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpendingIdThunk({ id }));
  }, [dispatch, id]);

  // HANDLE SUBMIT
  const url = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const search = "";
  const sort = "newest";
  const filter = "";
  const date = "";

  async function handleSubmit(e, spendingData) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${url}/userspendings/${id}`,
        spendingData,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
      );

      onClose();

      dispatch(fetchSpendingsThunk({ search, sort, filter, date }));
      dispatch(fetchSpendingIdThunk({ id }));

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

      <div className="fixed bg-white w-2/6 h-4/6 max-xl:w-1/2 rounded-3xl shadow-lg flex">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="p-10 w-full h-full mt-5">
              {spendingIdLoading ? (
                <Loading />
              ) : (
                <>
                  <Title text="Edit Spending" />
                  <SpendingForm
                    handleSubmit={handleSubmit}
                    spending={spendingId.data}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditModal;
