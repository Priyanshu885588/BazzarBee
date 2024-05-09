import React, { useState, useEffect } from "react";
import { BsPerson, BsEnvelope } from "react-icons/bs"; // Importing required icons
import { RiLockPasswordLine } from "react-icons/ri"; // Importing required icon
import { MdOutlinePhonelinkRing } from "react-icons/md";
import { sendVerificationCode, usersignUp } from "./api";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { CiBarcode } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";

import toast, { Toaster } from "react-hot-toast";
export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const [codeSent, setCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, isLoading] = useState(false);
  const notifySuccess = (message) => toast.success(message);
  const sendCode = async (e) => {
    e.preventDefault();
    try {
      isLoading(true);
      const data = await sendVerificationCode({ email });
      console.log(data);
      notifySuccess(data.message);
      setCodeSent(true);
    } catch (error) {
      console.error("failed:", error.response.data.message || error.message);
      setErrorMessage(error.response.data.message);
    } finally {
      isLoading(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      isLoading(true);
      console.log(email, username, password, verificationCode, phoneNumber);
      const data = await usersignUp({
        email,
        username,
        password,
        verificationCode,
        phoneNumber,
      });
      console.log(data);
      notifySuccess(data.message);
      localStorage.setItem("BazzarBeeToken", data.token);
      localStorage.setItem("BazzarBeeId", data.userId);
      navigate("/");
    } catch (error) {
      console.error("failed:", error.response.data.message || error.message);
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
      <div className="h-screen md:flex absolute top-0 w-full z-50">
        <Toaster />
        <div className="relative overflow-hidden md:flex w-1/2  i justify-around items-center hidden bg-black">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/WhatsApp%20Image%202024-05-04%20at%2020.58.11_e2b2e14b.jpg?alt=media&token=24699d11-295c-4ef8-9e64-bb2f51adb127"
              alt="logo"
              className=" h-96"
            />
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white flex-col">
          <form className="bg-white" onSubmit={handleSignUp}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome To BazzarBee
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <BsEnvelope className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none"
                type="email"
                name=""
                id=""
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                className="bg-black text-white rounded-xl px-2 py-1"
                onClick={(e) => sendCode(e)}
              >
                {!loading ? (
                  "Send"
                ) : (
                  <CgSpinnerTwoAlt className="text-white w-6 h-6 animate-spin" />
                )}
              </button>
            </div>

            {codeSent && (
              <>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <CiBarcode className="h-5 w-5 text-gray-400" />
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Verification Code"
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <BsPerson className="h-5 w-5 text-gray-400" />
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
                  <input
                    className="pl-2 outline-none border-none"
                    type="password"
                    name=""
                    id=""
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <FaPhoneVolume className="h-4 w-4 text-gray-400" />
                  <input
                    className="pl-2 outline-none border-none"
                    type="text"
                    name=""
                    id=""
                    placeholder="Phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <span className="text-sm ml-2 cursor-pointer">
                  Already have an account?{" "}
                  <a href="#" className="hover:text-blue-500">
                    LogIn
                  </a>
                </span>
                <button
                  type="submit"
                  className="block w-full bg-black mt-2 py-2 rounded-2xl text-white font-semibold mb-2"
                >
                  SignUp
                </button>
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                  Forgot Password ?
                </span>
              </>
            )}
          </form>
          {!codeSent && (
            <p className="text-sm font-normal text-gray-600 mb-7 opacity-75">
              Ready to verify? Click "Send" <br></br>we'll send you a code to
              confirm your account.
            </p>
          )}
          <p className="mt-2 text-red-500 lato text-sm text-center">
            {errorMessage}
          </p>
        </div>
      </div>
    </>
  );
};
