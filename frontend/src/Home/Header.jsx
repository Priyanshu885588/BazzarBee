import React from "react";
import { Navbar } from "./Navbar";
import ElectronicsImage from "../assets/electronics.png";
import FashionImage from "../assets/fashion.png";
import BeautyImage from "../assets/beauty.png";
import HomeImage from "../assets/home.png";
export const Header = () => {
  return (
    <>
      <Navbar />
      <div class="w-full h-[72vh] flex gap-4">
        <div class="row-span-1 bg-amber-700 px-4 py-7 pl-10 h-full w-3/5 rounded-3xl shadow-2xl flex flex-col items-start gap-4">
          <div className="flex">
            <h1 className=" text-7xl text-white quicksand">
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
          <div class="row-span-2 bg-black text-white p-4 h-2/3 rounded-3xl shadow-2xl">
            <iframe
              src="https://giphy.com/embed/qRaLFMJ73C2KGJW6Uj"
              className="h-full w-full rounded-xl"
            ></iframe>
          </div>
          <div class="bg-black text-white p-2 h-1/3 rounded-3xl shadow-2xl flex justify-end">
            <iframe
              src="https://giphy.com/embed/jT3y0MQrEHfWDnjgDN"
              className="h-full w-full"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};
