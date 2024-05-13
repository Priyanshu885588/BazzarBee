import React from "react";
export const SmallCards = ({ data }) => {
  return (
    <div className="w-24 h-52 hover:scale-95 cursor-pointer transition-all duration-200 relative">
      <img
        className="w-[100%] h-[70%]"
        src={data.imageUrl}
        alt="product image"
      />
      <div className="px-1 mt-1 w-full">
        <h5 className="text-xs font-semibold tracking-tight text-gray-900 ">
          {data.brandName}
        </h5>
        <p className="text-xs w-full">{data.subCategory}</p>
        <div className="flex justify-between mt-1.5 mb-1">
          <div className="flex items-center justify-between mr-2">
            <span className="text-xs font-bold text-gray-900 ">
              Rs. {data.price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
