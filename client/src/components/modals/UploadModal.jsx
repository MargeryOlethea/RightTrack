import { useState } from "react";
import Title from "../global/Title";
import ButtonColor from "../global/ButtonColor";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchSpendingsThunk } from "../../features/spendingsSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../global/Loading";

/* eslint-disable react/prop-types */
const UploadModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFile(file);
  }

  const search = "";
  const sort = "newest";
  const filter = "";
  const date = "";

  // HANDLE SUBMIT
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(
        `${url}/userspendings-photo`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } },
      );

      onClose();

      setFile("");

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

  // conditional modal
  if (!isOpen) return null;
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20">
      <div
        className="fixed top-0 left-0 w-full h-full bg-blue-900 opacity-50"
        onClick={onClose}
      ></div>

      <div className="fixed bg-white w-2/6 h-4/6 rounded-3xl shadow-lg flex max-xl:w-4/6 max-xl:h-1/2">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="p-10 mt-7 w-full h-full">
              <Title text="Upload Receipt" />

              <form
                className="mt-10"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <div className="relative rounded-3xl border-dashed border-2 border-gray-500 hover:border-blue-600 p-3 flex justify-center items-center h-60 mb-10">
                  <input
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                  />
                  <svg
                    className="w-8 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  {file ? (
                    <span className="text-gray-400 ml-2">{file.name}</span>
                  ) : (
                    <span className="text-gray-400 ml-2">Upload Image</span>
                  )}
                </div>

                <ButtonColor text="Submit" />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UploadModal;
