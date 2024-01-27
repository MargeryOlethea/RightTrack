/* eslint-disable react/prop-types */
const ButtonWhite = ({ text, className, onClick }) => {
  return (
    <>
      <button
        className={` text-slate-800 from-blue-400 to-rose-400 hover:bg-gradient-to-l p-2.5 px-5 font-bold rounded-full ease-in-out transition-all duration-500 hover:scale-105 hover:text-white max-md:text-xs max-md:py-2 max-md:px-4 ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default ButtonWhite;
