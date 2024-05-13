import React from "react";
import LogoImage from "../assets/blacklogo.png";
import { FaInstagram } from "react-icons/fa";
import { RiFacebookCircleLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { PiLinkedinLogo } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa";
export const Footer = () => {
  return (
    <div className="h-[60vh]  mt-8 flex justify-between border-t border-black px-10 items-center">
      <div className="h-fit flex flex-col border-black shadow-2xl p-5">
        <img src={LogoImage} alt="" className="h-32 w-[300px]" />
        <p className="w-52 text-sm text-gray-700 roboto">
          Empowering you to discover unique treasures. Shop Bazzarbee and find
          the perfect pieces to express your style.
        </p>
        <div className="flex mt-4 text-xl gap-2">
          <FaInstagram />
          <RiFacebookCircleLine />
          <FiYoutube />
          <PiLinkedinLogo />
          <BsTwitterX />
        </div>
      </div>
      <div className="h-full w-1/3 flex flex-col items-center justify-center gap-5 quicksand border-l">
        <h2 className=" text-3xl font-semibold">Subscribe our Newsletter</h2>
        <div>
          <input
            type="email"
            placeholder="Example@gmail.com"
            className="text-xl px-5 py-2 rounded-l-2xl h-10"
          />
          <button className=" px-5 py-2 rounded-r-2xl bg-white h-10">
            <FaArrowRight />
          </button>
        </div>
        <p>
          Terms and conditions{" "}
          <span className="underline ml-8">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};
