import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
export const Cards = () => {
  return (
    <div className="w-56 bg-white border border-gray-200 rounded-xl shadow">
      <img
        className="w-56 rounded-2xl"
        src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ultra-band-unselect-gallery-1-202309_GEO_IN?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1693544574532"
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
          <span className="text-xl font-bold text-gray-900 ">$599</span>
          <a
            href="#"
            className="text-white bg-blue-700 focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};
