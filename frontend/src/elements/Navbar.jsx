import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { getUserInfo } from "../userAuth/api";
import { CategoriesDropdown } from "./CategoriesDropdown";
import { useDispatch } from "react-redux";
export const Navbar = ({ prop }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [dropdown, setDropDown] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);

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
    <div
      className={`text-center bg-white rounded-${prop} h-20 flex mb-8 text-black py-2 shadow-lg w-full sticky z-50 top-0`}
      onMouseEnter={() => setCategoriesDropdown(false)}
    >
      <div className="h-full w-1/5  rounded-l-full flex justify-start gap-3 items-center pl-6">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/HomePage%2Fblacklogo.png?alt=media&token=f938f304-3c16-4600-9fd5-d4f7c1a69a60"
          alt="Brand-logo"
          className="w-40 h-full rounded-l-full"
        />
        <div className="w-[2px] h-1/2 bg-white"></div>
      </div>
      <div className="h-full w-[55%] flex items-center justify-between">
        <ul className="flex gap-5 text-gray-900 montserrat justify-center items-center text-lg h-full">
          <Link
            className="cursor-pointer hover:text-orange-800 hover:border-b-2 transition-all duration-200"
            to="/"
          >
            Home
          </Link>
          <li
            className="cursor-pointer hover:text-orange-800 hover:border-b-2 transition-all duration-200"
            onMouseEnter={() => setCategoriesDropdown(true)}
          >
            Categories
          </li>
          <li className="cursor-pointer hover:text-orange-800 hover:border-b-2 transition-all duration-200">
            Offers
          </li>
          <li className="cursor-pointer hover:text-orange-800 hover:border-b-2 transition-all duration-200">
            About Us
          </li>
        </ul>
        {categoriesDropdown && (
          <>
            <div
              className="w-[70vw] h-[80vh] bg-white absolute top-20 z-20 border-t-2"
              onMouseLeave={() => setCategoriesDropdown(false)}
            >
              <CategoriesDropdown />
            </div>

            <div
              className="h-screen w-screen absolute top-20 left-0 bg-black opacity-20 z-10"
              onMouseEnter={() => setCategoriesDropdown(false)}
            ></div>
          </>
        )}
        <div className="py-2 px-2 bg-gray-100 h-fit w-2/5 flex items-center gap-4">
          <IoIosSearch className="w-5 h-5" />
          <input
            type="search"
            className="w-full bg-transparent outline-none text-[0.8rem]"
            placeholder="Search for products,brand and more"
          />
        </div>
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
