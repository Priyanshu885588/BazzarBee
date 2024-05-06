import React from "react";
import { BsPerson, BsEnvelope } from "react-icons/bs"; // Importing required icons
import { RiLockPasswordLine } from "react-icons/ri"; // Importing required icon
import { MdOutlinePhonelinkRing } from "react-icons/md";

export const SignUp = () => {
  return (
    <>
      <div className="h-screen md:flex">
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
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello!</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome To BazzarBee
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <BsPerson className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Full name"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <BsEnvelope className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Email Address"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <MdOutlinePhonelinkRing className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none"
                type="tel"
                name=""
                id=""
                placeholder="Phone number"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Password"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-4">
              <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Confirm Password"
              />
            </div>
            <span className="text-sm ml-2 mt-4 cursor-pointer">
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
          </form>
        </div>
      </div>
    </>
  );
};
