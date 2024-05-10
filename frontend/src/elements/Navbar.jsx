import React from "react";
import Image from "../assets/logo_transparent.png";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserInfo } from "../userAuth/api";
export const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdown, setDropDown] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("BazzarBeeToken");
    localStorage.removeItem("BazzarBeeId");
    setIsLogin(false);
    setDropDown(false);
  };
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserData(data.user);
        setIsLogin(true);
      } catch (error) {}
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="text-center bg-black rounded-full h-16 shadow-2xl flex mb-8">
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
        <div
          className="h-10 w-36 bg-white rounded-full px-3 flex justify-between items-center cursor-pointer"
          onClick={() => setDropDown((prev) => !prev)}
        >
          {!isLogin ? (
            <>
              <Link className="roboto hover:font-bold" to="/userlogin">
                Login
              </Link>
              <p className="roboto">/</p>
              <Link
                className="roboto text-orange-500 hover:font-bold"
                to="/sign-up"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <p className="h-[30px] w-[30px] rounded-full bg-orange-400 flex justify-center items-center font-bold uppercase">
                {userData.username[0]}
              </p>
              <p className="text-black roboto overflow-hidden px-1 flex justify-center items-center">
                {userData.username.slice(0, 5)}..
              </p>
              <button>
                <IoIosArrowDown />
              </button>
            </>
          )}
        </div>
        {dropdown && userData && (
          <div className="h-32 w-1/5 bg-white absolute top-[6rem] z-50 rounded-2xl flex flex-col lato justify-start">
            <div className="px-4 text-sm text-gray-900 py-2 border-b border-black h-1/2">
              <div>{userData.username}</div>
              <div className="font-medium truncate">{userData.email}</div>
            </div>
            <ul
              className="text-sm text-gray-700 border-gray-400 flex flex-col justify-between"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <button className="w-full px-4 py-2 hover:bg-orange-100 border-y">
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  className="px-4 py-2 hover:bg-orange-100 rounded-b-2xl w-full border-y"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
