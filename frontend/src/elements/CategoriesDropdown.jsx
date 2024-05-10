import React from "react";
import { useNavigate } from "react-router-dom";

export const CategoriesDropdown = () => {
  const navigate = useNavigate();

  const naivgatePages = (mark) => {
    navigate(`/categories/${mark}`);
  };
  return (
    <div className="grid grid-cols-4 gap-4 h-full w-full p-4 px-6 roboto">
      <div className=" h-full w-full text-sm flex flex-col justify-start">
        <h5 className=" roboto text-orange-500 font-semibold text-left border-b-2 pb-2">
          Fashion & Clothing
        </h5>
        <button
          className="roboto text-orange-500 font-semibold text-left pt-3 mb-1 hover:text-orange-700"
          onClick={() => naivgatePages("men")}
        >
          Men's
        </button>
        <ul className="text-left flex flex-col gap-1 ">
          <li className="hover:font-bold cursor-pointer">T-Shirts</li>
          <li className="hover:font-bold cursor-pointer">Shirts</li>
          <li className="hover:font-bold cursor-pointer">Jackets</li>
          <li className="hover:font-bold cursor-pointer">Jeans</li>
          <li className="hover:font-bold cursor-pointer">Trousers</li>
          <li className="hover:font-bold cursor-pointer">Accessories</li>
        </ul>
        <h6 className=" roboto text-orange-500 font-semibold text-left mt-2 mb-1 border-t pt-2">
          Women's
        </h6>
        <ul className="text-left flex flex-col gap-1 ">
          <li className="hover:font-bold cursor-pointer">Kurtis</li>
          <li className="hover:font-bold cursor-pointer">T-Shirts</li>
          <li className="hover:font-bold cursor-pointer">Skirts</li>
          <li className="hover:font-bold cursor-pointer">Leggings, Salwar</li>
          <li className="hover:font-bold cursor-pointer">Lehenga Choli</li>
          <li className="hover:font-bold cursor-pointer">Accessories</li>
        </ul>
      </div>
      <div className=" h-full w-full text-sm">
        <h5 className=" roboto text-orange-500 font-semibold text-left border-b-2 pb-2 ">
          Electronics
        </h5>
      </div>
      <div className=" h-full w-full text-sm">
        <h5 className=" roboto text-orange-500 font-semibold text-left border-b-2 pb-2">
          Beauty
        </h5>
      </div>
      <div className="h-full w-full text-sm">
        <h5 className=" roboto text-orange-500 font-semibold text-left border-b-2 pb-2">
          Home & Kitchen
        </h5>
      </div>
    </div>
  );
};
