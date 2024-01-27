/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
import ButtonColor from "../components/global/ButtonColor";
// import ButtonWhite from "../components/global/ButtonWhite";
import Input from "../components/global/Input";
import RightTrack from "../components/global/RightTrack";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Loading from "../components/global/Loading";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  function inputData(field, e) {
    setLoginData({ ...loginData, [field]: e.target.value });
  }

  // GOOGLE LOGIN

  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(`${url}/google-login`, null, {
        headers: { token: codeResponse.credential },
      });

      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("username", data.data.username);

      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  // LOGIN BIASA

  async function handleLogin(e) {
    try {
      setLoading(true);
      e.preventDefault();

      const { data } = await axios.post(`${url}/login`, loginData);

      localStorage.setItem("access_token", data.data.access_token);
      localStorage.setItem("username", data.data.username);

      navigate("/");
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
      <div className="w-screen h-screen fixed flex justify-center items-center bg-cover bg-center bg-[url('/gradients/gradient5.jpeg')] ">
        <div className="bg-white bg-opacity-45 shadow-xl p-10 rounded-3xl w-2/6 h-5/6 max-xl:w-4/6 max-xl:h-4/6 max-md:w-5/6 max-md:h-5/6 border border-white">
          {loading ? (
            <Loading />
          ) : (
            <>
              {" "}
              <h1 className="text-center text-lg ">
                <RightTrack />
              </h1>
              <h1 className="text-center text-3xl font-extrabold text-slate-800 mt-10">
                Log In
              </h1>
              <form
                className="flex justify-center items-center h-[380px]"
                onSubmit={handleLogin}
              >
                <div className="w-full mx-auto">
                  <Input
                    type="text"
                    placeholder="username"
                    onChange={(e) => {
                      inputData("username", e);
                    }}
                  />
                  <Input
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                      inputData("password", e);
                    }}
                  />
                  <ButtonColor
                    text="Login"
                    className="mt-10 mx-auto block w-5/6"
                  />

                  <div className="mt-5 flex justify-center">
                    <GoogleLogin onSuccess={googleLogin} />
                  </div>
                </div>
              </form>
              <p className="text-center text-slate-600 mt-5 font-medium">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="text-rose-800 hover:text-blue-800 hover:font-bold ease-in-out transition-colors duration-500">
                    Register here.
                  </span>
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
