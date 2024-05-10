import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
export const Cards = () => {
  return (
    <div className="w-56">
      <img
        className="w-56 rounded-2xl"
        src="https://thumbs.dreamstime.com/b/new-apple-watch-inches-white-background-uzhgorod-ukraine-december-line-smartwatches-designed-developed-marketed-134996286.jpg"
        alt="product image"
      />

      <div className="px-5 pb-5">
        <h5 className="text-base font-semibold tracking-tight text-gray-900 ">
          Apple Watch Series 7 GPS
        </h5>

        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <TiStarFullOutline className="text-yellow-400" />
            <TiStarFullOutline className="text-yellow-400" />
            <TiStarFullOutline className="text-yellow-400" />
            <TiStarFullOutline className="text-yellow-400" />
            <TiStarFullOutline className="text-yellow-400" />
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900 ">$599</span>
        </div>
      </div>
    </div>
  );
};
