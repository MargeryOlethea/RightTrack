/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import ButtonColor from "../global/ButtonColor";
import { useEffect, useState } from "react";
import { fetchCategoriesThunk } from "../../features/categoriesSlice";
import Loading from "../global/Loading";

const SpendingForm = ({ handleSubmit, spending }) => {
  // NGAMBIL CATEGORY
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  // AMBIL DATA
  const [spendingData, setSpendingData] = useState({
    name: "",
    amount: 0,
    date: "",
    CategoryId: 0,
    description: "",
  });

  useEffect(() => {
    if (spending) {
      setSpendingData({
        name: spending.name,
        amount: spending.amount,
        date: spending.date,
        CategoryId: spending.CategoryId,
        description: spending.description,
      });
    }
  }, [spending]);

  function inputData(field, e) {
    let value = e.target.value;

    if (field === "amount" || field === "CategoryId") {
      value = +value;
    }

    setSpendingData({ ...spendingData, [field]: value });
  }
  return (
    <>
      <form className="mt-10" onSubmit={(e) => handleSubmit(e, spendingData)}>
        <div className="flex gap-5 w-full justify-center max-md:flex-wrap">
          {/* KIRI */}
          <div>
            {/* name */}
            <div>
              <p className="text-xs font-bold">Name</p>
              <input
                placeholder="lunch"
                type="text"
                name="name"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
                onChange={(e) => inputData("name", e)}
                value={spendingData.name}
              />
            </div>

            {/* date */}
            <div className="mt-5">
              <p className="text-xs font-bold">Date</p>
              <input
                type="date"
                name="date"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
                onChange={(e) => inputData("date", e)}
                value={
                  spendingData.date
                    ? new Date(spendingData.date).toISOString().split("T")[0]
                    : ""
                }
              />
            </div>
          </div>

          {/* KANAN */}
          <div>
            {/* name */}
            <div>
              <p className="text-xs font-bold">Amount</p>
              <input
                type="number"
                name="amount"
                className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
                placeholder="50000"
                onChange={(e) => inputData("amount", e)}
                value={spendingData.amount}
              />
            </div>

            {/* category */}
            <div className="mt-5">
              <p className="text-xs font-bold">Category</p>
              {categoriesLoading ? (
                <Loading />
              ) : (
                <>
                  <select
                    name="CategoryId"
                    className="border-none bg-rose-100 rounded-full w-full mt-2"
                    onChange={(e) => inputData("CategoryId", e)}
                    value={spendingData.CategoryId}
                  >
                    {!spendingData.CategoryId && (
                      <option value="" disabled selected hidden>
                        Categories...
                      </option>
                    )}
                    {categories?.data?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5  max-xl:mx-5">
          <p className="text-xs font-bold">Description</p>
          <input
            type="text"
            placeholder="your description here"
            name="description"
            className="border-none bg-gradient-to-r from-blue-100 to-rose-100 rounded-full w-full mt-2"
            onChange={(e) => inputData("description", e)}
            value={spendingData.description}
          />
        </div>
        <ButtonColor text="submit" className="mx-auto block mt-10 w-1/2" />
      </form>
    </>
  );
};

export default SpendingForm;
