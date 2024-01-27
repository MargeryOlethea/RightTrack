import rupiah from "../../helpers/priceConverter";

/* eslint-disable react/prop-types */
const SpendingSummary = ({ spending }) => {
  return (
    <>
      <div className="flex gap-10 mt-10 text-xs max-md:flex-wrap max-md:gap-0">
        {/* KIRI */}
        <div className="w-full">
          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-indigo-500 text-indigo-500 ">
            <span>Shopping</span>
            <span className="font-bold">{rupiah(spending?.shopping)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-green-500 text-green-500 ">
            <span>Transportation</span>
            <span className="font-bold">
              {rupiah(spending?.transportation)}
            </span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-orange-500 text-orange-500 ">
            <span>Food</span>
            <span className="font-bold">{rupiah(spending?.food)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-yellow-500 text-yellow-500 ">
            <span>Entertainment</span>
            <span className="font-bold">{rupiah(spending?.entertainment)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-purple-500 text-purple-500 ">
            <span>Bills</span>
            <span className="font-bold">{rupiah(spending?.bills)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-red-500 text-red-500 ">
            <span>Health</span>
            <span className="font-bold">{rupiah(spending?.health)}</span>
          </div>
        </div>
        {/* KANAN */}
        <div className="w-full">
          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-blue-500 text-blue-500 ">
            <span>Clothes</span>
            <span className="font-bold">{rupiah(spending?.clothes)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-teal-500 text-teal-500 ">
            <span>Education</span>
            <span className="font-bold">{rupiah(spending?.education)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-pink-500 text-pink-500 ">
            <span>Gift</span>
            <span className="font-bold">{rupiah(spending?.gift)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-fuchsia-500 text-fuchsia-500 ">
            <span>Savings</span>
            <span className="font-bold">{rupiah(spending?.savings)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 border px-5 py-2.5 rounded-full border-gray-500 text-gray-500 ">
            <span>Other</span>
            <span className="font-bold">{rupiah(spending?.other)}</span>
          </div>

          <div className="flex justify-between w-full mt-3 shadow-md px-5 py-2.5 rounded-full text-slate-500 bg-white">
            <span className="font-bold">Total</span>
            <span className="font-extrabold">{rupiah(spending?.total)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpendingSummary;
