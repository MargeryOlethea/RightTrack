/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import ButtonWhite from "../components/global/ButtonWhite";
import SpendingRows from "../components/userPage/SpendingRows";
import Title from "../components/global/Title";
import { useEffect, useState } from "react";
import { fetchSpendingsThunk } from "../features/spendingsSlice";
import { fetchCategoriesThunk } from "../features/categoriesSlice";
import Loading from "../components/global/Loading";
import DateFilter from "../components/global/DateFilter";
import Swal from "sweetalert2";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const UserPage = ({ url }) => {
  const {
    spendings,
    loading: spendingsLoading,
    error: spendingsError,
  } = useSelector((state) => state.spendings);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  const [openEditModal, setSpendingId] = useOutletContext();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [filter, setFilter] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    dispatch(
      fetchSpendingsThunk({ search, sort, filter, date }),
      fetchCategoriesThunk(),
    );
  }, [dispatch, search, sort, filter, date]);

  // SEARCH
  function handleSearch(e) {
    e.preventDefault();
    let newSearch = e.target.value;
    setSearch(newSearch);
  }

  // SORT
  function handleLatest() {
    setSort("newest");
  }

  function handleBiggest() {
    setSort("biggest");
  }

  // FILTER CATEGORY
  function handleCategory(e) {
    setFilter(e.target.value);
  }

  //FILTER MONTH
  function handleMonthFilter(e) {
    setDate(e.target.value);
  }

  // DELETE
  let dataDelete = "";
  async function handleDelete(id) {
    try {
      setLoading(true);

      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        dataDelete = await axios.delete(`${url}/userspendings/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.access_token}` },
        });
      }

      dispatch(fetchSpendingsThunk({ search, sort, filter, date }));
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setLoading(false);

      Swal.fire({
        icon: "success",
        title: dataDelete.data.message,
      });
    }
  }

  return (
    <>
      <div className="m-10 mt-16 bg-white bg-opacity-80 rounded-3xl pb-10 pt-12 px-7 shadow-lg h-full text-slate-800">
        {" "}
        <div className="flex justify-between items-center">
          <Title text="My Spendings" />
          {spendings.totalData !== 0 && (
            <input
              type="text"
              placeholder="search here..."
              className="p-2 border-none rounded-2xl w-[400px] block my-5 bg-white hover:border hover:border-rose-500 bg-opacity-80 ease-in-out transition-colors duration-500 shadow-md"
              onChange={handleSearch}
              value={search}
            ></input>
          )}
        </div>
        {spendingsLoading || categoriesLoading || loading ? (
          <Loading />
        ) : (
          <>
            {/* SORT & FILTER */}
            {spendings.totalData === 0 && (
              <>
                <div className="my-10 w-full">
                  <p className="font-semibold">
                    you have no spendings yet, track yours now!
                  </p>
                </div>
              </>
            )}

            <div className="flex my-10 justify-between w-full text-slate-800 max-xl:flex-wrap max-xl:gap-3">
              <DateFilter onChange={handleMonthFilter} date={date} />

              <div className=" flex gap-3 justify-center items-center">
                <h1 className="font-bold">Sort By</h1>
                <ButtonWhite
                  text="Latest"
                  onClick={handleLatest}
                  className="bg-white"
                />
                <ButtonWhite
                  text="Biggest"
                  onClick={handleBiggest}
                  className="bg-white"
                />
              </div>
              <div className="flex gap-3 items-center ">
                <h1 className="font-bold">Filter By</h1>
                <select
                  name="category"
                  className="font-bold p-2.5 px-6 rounded-full text-slate-800 border-none max-md:py-2 max-md:text-xs max-md:px-4"
                  onChange={handleCategory}
                  defaultValue={filter}
                >
                  <option value="">Categories</option>
                  {categories?.data?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* TABLE START */}
            {!spendingsError && !categoriesError && spendings && (
              <div className="w-full h-full my-10">
                <div className="flex w-full rounded-2xl shadow-lg py-3 pl-4 mb-8 bg-white text-left bg-opacity-80 items-center text-sm font-bold">
                  <p className="w-1/12 max-xl:hidden">id</p>
                  <p className="w-1/12 max-md:hidden max-xl:w-2/12">date</p>
                  <p className="w-2/12 max-xl:w-3/12 max-md:text-xs max-sm:w-1/3">
                    name
                  </p>
                  <p className="w-2/12 max-md:text-xs max-sm:w-1/3">amount</p>
                  <p className="w-2/12 max-md:text-xs max-xl:pr-5 max-md:w-3/12 max-sm:hidden">
                    category
                  </p>
                  <p className="w-2/12 max-xl:hidden">description</p>
                  <p className="w-2/12 max-md:text-xs max-sm:w-1/3">action</p>
                </div>

                {spendings?.data?.map((spending) => (
                  <SpendingRows
                    key={spending.id}
                    spending={spending}
                    handleDelete={handleDelete}
                    openEditModal={openEditModal}
                    setSpendingId={setSpendingId}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserPage;
