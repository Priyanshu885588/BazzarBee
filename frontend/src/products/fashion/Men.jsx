import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FashionProducts } from "./FashionProducts";

export const Men = () => {
  return (
    <div className="min-h-[200vh] w-full roboto px-6 text-[14px] font-light">
      <div className="flex flex-col gap-3">
        <div>
          <Link className="capitalize" to="/">
            Home
          </Link>{" "}
          /{" "}
          <Link className="font-bold" to="/categories/men">
            Men's Clothing
          </Link>
        </div>
        <div>
          <p className="text-base">
            <span className="font-bold">Men's Clothing</span> - 1000+ items
          </p>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="w-1/5">
          <div className="border-b py-4 h-12">
            <span className="uppercase font-bold text-base">Filters</span>
          </div>
          <div className="border-b py-4 ">
            <span className="uppercase font-bold my-4">Categories</span>
            <ul className="py-4">
              <li className="flex gap-2">
                <input type="checkbox" className="capitalize" />
                <p className="capitalize">Tshirts (120)</p>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" />
                <p className="capitalize">Lounge Tshirts (10)</p>
              </li>
            </ul>
          </div>
          <div className="border-b py-4">
            <span className="uppercase font-bold my-4">Brand</span>
            <ul className="py-4">
              <li className="flex gap-2">
                <input type="checkbox" className="capitalize" />
                <p className="capitalize">Roadster</p>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" />
                <p className="capitalize">Nike</p>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" />
                <p className="capitalize">Puma</p>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" />
                <p className="capitalize">HRX by Hrithik Roshan</p>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" />
                <p className="capitalize">WROGN</p>
              </li>
            </ul>
          </div>
          <div className="border-b py-4">
            <span className="uppercase font-bold my-4">Price</span>
            <ul className="py-4">
              <li className="flex gap-2">
                <input type="checkbox" className="capitalize" />
                <p className="capitalize">Rs. 200 to Rs. 1000</p>
              </li>
              <li className="flex gap-2">
                <input type="checkbox" />
                <p className="capitalize">Rs. 1000 to Rs. 2000</p>
              </li>
            </ul>
          </div>
          <div className="border-b py-4">
            <span className="uppercase font-bold my-4">Color</span>
            <ul className="py-4">
              <li className="flex gap-2 items-center">
                <input type="checkbox" className="capitalize" />
                <span className="w-3 h-3 bg-black rounded-full"></span>
                <p className="capitalize">black</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" />
                <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
                <p className="capitalize">Blue</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" />
                <span className="w-3 h-3 bg-white rounded-full border"></span>
                <p className="capitalize">white</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" />
                <span className="w-3 h-3 bg-red-700 rounded-full"></span>
                <p className="capitalize">Red</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" />
                <span className="w-3 h-3 bg-green-700 rounded-full"></span>
                <p className="capitalize">Green</p>
              </li>
              <li className="flex gap-2 items-center">
                <input type="checkbox" />
                <span className="w-3 h-3 bg-blue-700 rounded-full"></span>
                <p className="capitalize">Blue</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-5/6">
          <div className="border-b pt-4 pb-6 h-12 flex gap-1 items-center justify-between px-4">
            <div className="flex items-center capitalize gap-4">
              <span className="flex items-center gap-2">
                size <IoIosArrowDown />
              </span>
              <span className="flex items-center gap-2">
                Origin <IoIosArrowDown />
              </span>
              <span className="flex items-center gap-2">
                Pattern <IoIosArrowDown />
              </span>
            </div>
            <div className="mr-4">
              <button className="py-2 px-4 border-2 flex items-center gap-8 font-normal">
                Sort by : Recommended <IoIosArrowDown />
              </button>
            </div>
          </div>
          <FashionProducts />
        </div>
      </div>
    </div>
  );
};
