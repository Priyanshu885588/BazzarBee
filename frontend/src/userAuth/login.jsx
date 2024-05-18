import React, { useState, useEffect } from "react";
import { userlogin } from "./api";
import { Link, useNavigate } from "react-router-dom";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import ImagePane from "../assets/plane.gif";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, isLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      isLoading(true);
      const data = { username, email, password };
      console.log(data);
      const result = await userlogin(data);
      console.log("Login successful!", result);
      localStorage.setItem("BazzarBeeToken", result.token);
      localStorage.setItem("BazzarBeeId", result.userId);
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response.data.message || error.message
      );
      setErrorMessage(error.response.data.message);
    } finally {
      isLoading(false);
    }
  };

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem("BazzarBeeToken");
      localStorage.removeItem("BazzarBeeId");
    };
    handleLogout();
  }, []);

  return (
    <>
      <div className="min-h-screen md:flex absolute top-0 w-full z-50">
        <div className="relative overflow-hidden md:flex w-1/2 i justify-around items-center hidden bg-black back-image-svg z-30">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/HomePage%2Flogo_transparent.png?alt=media&token=468130ad-b207-47c0-9bb6-8831474ea819"
            alt="logo"
            className=" h-48"
          />
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center flex-col bg-white relative">
          <div className="absolute w-screen h-20 bg-transparent top-5">
            <div className="absolute flex items-center entry-ani-banner right-[20%]">
              <div className="bg-gray-50 w-[fit] h-8 shadow-md rounded-md border z-20 border-black text-[13px] py-1 px-2 quicksand flex justify-center items-center">
                Log in securely. We've got your privacy covered.
              </div>
              <img
                src={ImagePane}
                className="w-20 h-20 z-10 rotate-45 bg-blend-multiply"
              ></img>
            </div>
          </div>
          <form className="bg-white" onSubmit={handleSubmit}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="email"
                name=""
                id=""
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="password"
                name=""
                id=""
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <span className="text-sm ml-2 mt-4 cursor-pointer">
              Do not have an account?{" "}
              <Link to="/sign-up" className="hover:text-blue-500">
                Sign Up
              </Link>
            </span>
            <button
              type="submit"
              className="flex w-full bg-black mt-2 py-2 rounded-2xl text-white font-semibold mb-2 justify-center items-center"
            >
              {!loading ? (
                "Login"
              ) : (
                <CgSpinnerTwoAlt className="text-white w-6 h-6 animate-spin" />
              )}
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              Forgot Password ?
            </span>
          </form>
          <p className="mt-2 text-red-500 lato text-sm text-center">
            {errorMessage}
          </p>
        </div>
      </div>
    </>
  );
};
