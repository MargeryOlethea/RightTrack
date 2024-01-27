/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import ButtonWhite from "../global/ButtonWhite";
import RightTrack from "../global/RightTrack";
import NewSpending from "./NewSpending";

const Navbar = ({ openUploadModal, openCreateModal }) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <div className="bg-white bg-opacity-80 border border-white py-5 px-7 mx-10 rounded-3xl shadow-lg flex justify-between items-center max-md:gap-2">
        <h1 className="text-xl max-md:text-xs">
          <RightTrack />
        </h1>
        <Link to="/my-spending" className="max-md:hidden">
          <ButtonWhite text="My Profile" />
        </Link>

        <div className="flex gap-5">
          <NewSpending
            openUploadModal={openUploadModal}
            openCreateModal={openCreateModal}
          />
          <ButtonWhite text="Log out" onClick={handleLogout} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
