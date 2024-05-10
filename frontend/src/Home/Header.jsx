import React from "react";

import ElectronicsImage from "../assets/electronics.png";
import FashionImage from "../assets/fashion.png";
import BeautyImage from "../assets/beauty.png";
import HomeImage from "../assets/home.png";
import { MdArrowOutward } from "react-icons/md";
import { Navbar } from "../elements/Navbar";
export const Header = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-[72vh] flex gap-4">
        <div className="row-span-1 bg-amber-700 px-4 py-7 pl-10 h-full w-3/5 rounded-3xl shadow-2xl flex flex-col items-start justify-between gap-4">
          <div className="flex">
            <h1 className="2xl:text-8xl xl:text-7xl text-white quicksand">
              Limited-Time Deals! Up to 70% Off!
            </h1>
          </div>
          <p className="text-gray-100 w-2/3 lato opacity-65">
            Don't miss out! Huge savings on your favorite items across all
            categories. Shop now before they're gone!
          </p>
          <div className="flex justify-between w-full">
            <button className="h-12 px-5 py-3 bg-white rounded-lg hover:bg-amber-300">
              Explore more
            </button>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center gap-3">
                <img
                  src={ElectronicsImage}
                  alt=""
                  className="w-11 h-11 bg-white rounded-full p-1"
                />
                <img
                  src={FashionImage}
                  alt=""
                  className="w-11 h-11 bg-white rounded-full p-1"
                />
                <img
                  src={BeautyImage}
                  alt=""
                  className="w-11 h-11 bg-white rounded-full p-1"
                />
                <img
                  src={HomeImage}
                  alt=""
                  className="w-11 h-11 bg-white rounded-full p-1"
                />
              </div>
              <h3 className="text-white text-right w-full text-lg p-2 opacity-70">
                80+ Products
              </h3>
            </div>
          </div>
        </div>
        <div className="w-2/5 h-full flex flex-col gap-4 rounded-3xl">
          <div className="row-span-2 text-white p-4 h-2/3 rounded-3xl shadow-2xl homeSlideshow flex flex-col justify-end">
            <div className="h-1/4 w-full text-white quicksand text-sm flex justify-end">
              <p className="w-2/3 xl:text-sm 2xl:text-lg text-center border-r p-2 backdrop-blur-3xl rounded-2xl font-bold opacity-85">
                Show your BazzarBee pride. Get high-quality swag directly from
                the brands.
              </p>
            </div>
            <div className="h-1/4 w-full flex justify-end items-end">
              <button className="bg-white roboto text-black py-3 px-4 rounded-full text-xs font-semibold hover:bg-amber-400 transition-all duration-300">
                Start Shopping
              </button>
              <button className="bg-white roboto text-black p-2 rounded-full hover:bg-amber-400 transition-all duration-300">
                <MdArrowOutward color="black" size="20px" />
              </button>
            </div>
          </div>
          <div className="text-white p-2 h-1/3 rounded-3xl shadow-2xl flex justify-start homebeauty items-center">
            <p className="text-black font-bold w-1/3 2xl:text-4xl xl:text-2xl h-full p-2 playfair opacity-65">
              Kiss dull skin goodbye
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
