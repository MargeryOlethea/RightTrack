/* eslint-disable react/prop-types */
import ButtonColor from "../components/global/ButtonColor";
import Input from "../components/global/Input";
import { Link, useNavigate } from "react-router-dom";
import RightTrack from "../components/global/RightTrack";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../components/global/Loading";

const RegisterPage = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
  });
  function inputData(field, e) {
    setRegisterData({ ...registerData, [field]: e.target.value });
  }

  async function handleRegister(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const { data } = await axios.post(`${url}/register`, registerData);
      navigate("/login");

      Swal.fire({
        title: "Success!",
        text: `${data.message}, please login`,
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="w-screen h-screen bg-cover bg-center bg-[url('/gradients/gradient4.jpeg')] fixed flex justify-end items-center max-xl:justify-center">
        {loading ? (
          <Loading />
        ) : (
          <>
            {" "}
            <div className="w-6/12 ml-10 h-5/6 p-10 mr-10 max-xl:hidden">
              <h1 className="font-extrabold text-6xl my-5 text-slate-800">
                Stay on Track with
              </h1>
              <h1 className="font-extrabold text-6xl my-5 text-slate-800">
                <RightTrack />
              </h1>

              <div className="mt-16">
                <h3 className="font-extrabold text-white text-lg mb-2 mt-5">
                  Lorem, ipsum dolor.
                </h3>
                <p className=" text-white text-sm font-medium leading-loose mb-7">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Neque atque iste ratione assumenda rem cupiditate dolorum amet
                  laudantium odit modi, aperiam, a tempora itaque maiores? Quod
                  quisquam deleniti atque autem?
                </p>

                <h3 className="font-extrabold text-white text-lg mb-2 mt-5">
                  Lorem, ipsum dolor.
                </h3>
                <p className=" text-white font-medium text-sm leading-loose">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Veniam, eveniet recusandae rem odio ipsa laborum ex obcaecati
                  facilis eius sint repellat unde saepe animi quo error fugit
                  eos blanditiis nostrum.
                </p>
              </div>

              <h1 className="text-xl mt-10 font-extrabold text-slate-800">
                Right Now, <RightTrack />
              </h1>
            </div>
            <div className="w-5/12 h-5/6 mr-20 rounded-3xl shadow-xl p-10 bg-white bg-opacity-45 border-white border max-xl:w-5/6 max-xl:mx-0 max-xl:flex max-xl:items-center">
              <div className="max-xl:my-auto max-xl:w-full">
                <h1 className="text-center text-3xl font-extrabold text-slate-800 mt-10 max-xl:mt-0">
                  Register
                </h1>

                <form
                  className="flex justify-center items-center h-[400px]"
                  onSubmit={handleRegister}
                >
                  <div className="w-full mx-auto mt-30">
                    <Input
                      type="text"
                      placeholder="example@mail.com"
                      onChange={(e) => inputData("email", e)}
                    />
                    <Input
                      type="text"
                      placeholder="username"
                      onChange={(e) => inputData("username", e)}
                    />
                    <Input
                      type="password"
                      placeholder="password"
                      onChange={(e) => inputData("password", e)}
                    />
                    <ButtonColor
                      text="Register"
                      className="mt-10 mx-auto block w-5/6"
                    />
                  </div>
                </form>
                <p className="text-center text-slate-600 mt-5 font-medium">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-rose-800 hover:text-blue-800 hover:font-bold ease-in-out transition-colors duration-500">
                      Log in here.
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RegisterPage;
