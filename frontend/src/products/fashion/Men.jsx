import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FashionProducts } from "./FashionProducts";
import { getmensFilterData } from "../services/api";
export const Men = () => {
  const [filterData, setFilterData] = useState();
  const [priceRange, setPriceRange] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getmensFilterData();
        setFilterData(data);
        const sum = (data.highestPrice - data.lowestPrice) / 4;
        const newPriceRange = [];

        for (let i = 0; i <= 2; i++) {
          newPriceRange.push(sum + data.lowestPrice + i);
        }

        newPriceRange.push(data.highestPrice);
        setPriceRange(newPriceRange);
      } catch (error) {}
    };
    fetchProducts();
  }, []);
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
        {filterData && (
          <div className="w-1/5">
            <div className="border-b py-4 h-12">
              <span className="uppercase font-bold text-base">Filters</span>
            </div>
            <div className="border-b py-4 ">
              <span className="uppercase font-bold my-4">Categories</span>
              <ul className="py-4">
                {filterData.subcategories.map((data, index) => (
                  <li className="flex gap-2" key={index}>
                    <input type="checkbox" className="capitalize" />
                    <p className="capitalize">{data}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b py-4">
              <span className="uppercase font-bold my-4">Brand</span>
              <ul className="py-4">
                {filterData.brands.map((data, index) => (
                  <li className="flex gap-2" key={index}>
                    <input type="checkbox" className="capitalize" />
                    <p className="capitalize">{data}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b py-4">
              <span className="uppercase font-bold my-4">Price</span>
              <ul className="py-4">
                <li className="flex gap-2">
                  <input type="checkbox" className="capitalize" />
                  <p className="capitalize">
                    Rs. {priceRange[0]} to Rs. {priceRange[1]}
                  </p>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" />
                  <p className="capitalize">
                    Rs. {priceRange[1]} to Rs. {priceRange[2]}
                  </p>
                </li>
                <li className="flex gap-2">
                  <input type="checkbox" />
                  <p className="capitalize">
                    Rs. {priceRange[2]} to Rs. {priceRange[3]}
                  </p>
                </li>
              </ul>
            </div>
            <div className="border-b py-4">
              <span className="uppercase font-bold my-4">Color</span>
              <ul className="py-4">
                {filterData.colors.map((data, index) => (
                  <li className="flex gap-2 items-center" key={index}>
                    <input type="checkbox" className="capitalize" />
                    <span
                      className="w-3 h-3 rounded-full border border-black"
                      style={{ backgroundColor: data.split(" ")[1] }}
                    ></span>
                    <p className="capitalize">{data.split(" ")[0]}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
