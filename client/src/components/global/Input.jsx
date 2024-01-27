/* eslint-disable react/prop-types */
const Input = ({ type, placeholder, onChange }) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-2xl w-5/6 mx-auto block my-5 bg-white hover:border hover:border-rose-500 bg-opacity-60 ease-in-out transition-colors duration-500 border-white"
        onChange={onChange}
      ></input>
    </>
  );
};

export default Input;
