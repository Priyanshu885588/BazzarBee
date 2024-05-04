import React from "react";
import Image from "../assets/logo_transparent.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
export const Navbar = () => {
  return (
    <div className="text-center bg-black rounded-full h-16 shadow-2xl flex mb-6">
      <div className="h-full w-1/5  rounded-l-full flex justify-start gap-3 items-center pl-6">
        <img
          src={Image}
          alt="Brand-logo"
          className="w-40 h-full rounded-l-full"
        />
        <div className="w-[2px] h-1/2 bg-white"></div>
      </div>
      <div className="h-full w-[55%] ">
        <ul className="flex gap-5 text-gray-300 montserrat justify-center items-center text-lg h-full">
          <li className="cursor-pointer hover:text-white hover:border-b transition-all duration-200">
            Home
          </li>
          <li className="cursor-pointer hover:text-white hover:border-b transition-all duration-200">
            Categories
          </li>
          <li className="cursor-pointer hover:text-white hover:border-b transition-all duration-200">
            Offers
          </li>
          <li className="cursor-pointer hover:text-white hover:border-b transition-all duration-200">
            About Us
          </li>
        </ul>
      </div>
      <div className="h-full w-1/4 rounded-r-full pr-8 flex justify-end items-center gap-5">
        <div className="h-10 w-10 p-2 bg-white rounded-full cursor-pointer hover:bg-amber-500 transition-all duration-150">
          <MdOutlineShoppingCart size="25px" />
        </div>
        <div className="h-10 w-32 bg-white rounded-full px-3 flex justify-between items-center">
          <img
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="h-[30px] w-[30px] rounded-full"
          />
          <p className="text-black roboto">Julie</p>
          <button>
            <IoIosArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};
