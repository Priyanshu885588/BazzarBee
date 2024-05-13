import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
export const Cards = ({ data }) => {
  return (
    <div className="w-56 hover:scale-95 cursor-pointer transition-all duration-200">
      <img
        className="w-[220px] h-[300px]"
        src={data.imageUrl}
        alt="product image"
      />
      <div className="px-3 mt-2">
        <h5 className="text-base font-semibold tracking-tight text-gray-900 ">
          {data.brandName}
        </h5>
        <p className="">{data.name}</p>
        <div className="flex justify-between mt-2.5 mb-3">
          <span className="bg-blue-50 text-blue-800 font-semibold px-2.5 py-0.5 flex items-center justify-center gap-1">
            <TiStarFullOutline className="text-orange-400" />
            <p>{data.averageRating.toFixed(1)}</p>
          </span>
          <div className="flex items-center justify-between mr-2">
            <span className="text-sm font-bold text-gray-900 ">
              Rs. {data.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
