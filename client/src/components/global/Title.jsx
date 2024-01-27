/* eslint-disable react/prop-types */
const Title = ({ text }) => {
  return (
    <>
      <h1 className="font-extrabold text-slate-800 text-3xl max-md:text-xl">
        {text}
      </h1>
    </>
  );
};

export default Title;
