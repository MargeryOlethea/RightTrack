/* eslint-disable react/prop-types */
import dateConverter from "../../helpers/dateConverter";
import rupiah from "../../helpers/priceConverter";
import ButtonWhite from "../global/ButtonWhite";
import Category from "./Category";

const SpendingRows = ({
  spending,
  handleDelete,
  openEditModal,
  setSpendingId,
}) => {
  return (
    <>
      <div className="flex w-full rounded-2xl shadow-lg py-2 min-h-[65px] max-h-[65px] max-md:h-full max-sm:py-12 pl-4 mt-4 bg-white text-left bg-opacity-80 items-center">
        <p className="w-1/12 max-xl:hidden">{spending.id}</p>
        <p className="w-1/12 text-xs text-slate-700 max-md:hidden max-xl:w-2/12">
          {dateConverter(spending.date)}
        </p>
        <p className="w-2/12 font-semibold max-xl:text-sm max-xl:w-3/12 max-sm:w-1/3">
          {spending.name}
        </p>
        <p className="w-2/12 text-rose-700 max-md:text-xs max-sm:w-1/3">
          {rupiah(spending.amount)}
        </p>
        <div className="w-2/12 pr-5 max-xl:pr-5 max-md:w-3/12 max-sm:hidden">
          <Category text={spending.Category.name} />
        </div>
        <p className="w-2/12 text-xs text-slate-700 max-xl:hidden">
          {spending?.description?.substring(0, 70)}
          {spending.description && <span className="text-gray-400">...</span>}
        </p>
        <div className="w-2/12 flex gap-4 max-sm:flex-wrap max-sm:gap-1 max-sm:justify-center max-xl:gap-2 max-sm:w-1/3">
          <ButtonWhite
            text="edit"
            className="font-medium bg-blue-500 text-white"
            onClick={() => {
              openEditModal(), setSpendingId(spending.id);
            }}
          />
          <ButtonWhite
            text="delete"
            className="font-medium bg-rose-500 text-white"
            onClick={() => {
              handleDelete(spending.id);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SpendingRows;
