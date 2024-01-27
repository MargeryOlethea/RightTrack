import { Link } from "react-router-dom";

const RightTrack = () => {
  return (
    <>
      <Link to="/">
        <span className="font-extrabold transform hover:scale-110 bg-gradient-to-r from-blue-700 to-rose-400 text-transparent bg-clip-text  hover:text-rose-500 duration-700 transition-all ease-in-out">
          RightTrack
        </span>
      </Link>
    </>
  );
};

export default RightTrack;
