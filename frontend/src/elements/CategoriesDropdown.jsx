import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getmensFilterData } from "../products/services/api";
import { GiJumpingRope } from "react-icons/gi";

export const CategoriesDropdown = () => {
  const [filterData, setFilterData] = useState();
  const [isloading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const navigate = useNavigate();

  const naivgatePages = (mark, category = "") => {
    navigate(`/categories/${mark}?category=${category}`);
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setisLoading(true);
        const data = await getmensFilterData();
        setFilterData(data);
      } catch (error) {
        console.log("Something Went wrong");
      } finally {
        setisLoading(false);
        setTimeout(() => {
          setisError(false);
        }, 4000);
      }
    };
    fetchFilterData();
  }, []);

  if (isloading) {
    return (
      <div className="h-full w-full flex flex-col justify-center items-center gap-2">
        <GiJumpingRope className="animate-bounce w-8 h-8" />

        <p className="opacity-85 roboto font-light text-sm animate-pulse">
          Hold on! We're assembling your Avengers of awesome (products).
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4 h-full w-full p-4 px-6 roboto">
      {filterData && (
        <>
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
              {filterData.subcategories.map((data, index) => (
                <li
                  className="hover:font-bold cursor-pointer"
                  key={index}
                  onClick={() => naivgatePages("men", data)}
                >
                  {data}
                </li>
              ))}
            </ul>
            <h6 className=" roboto text-orange-500 font-semibold text-left mt-2 mb-1 border-t pt-2">
              Women's
            </h6>
            <ul className="text-left flex flex-col gap-1 ">
              <li className="hover:font-bold cursor-pointer">Kurtis</li>
              <li className="hover:font-bold cursor-pointer">T-Shirts</li>
              <li className="hover:font-bold cursor-pointer">Skirts</li>
              <li className="hover:font-bold cursor-pointer">
                Leggings, Salwar
              </li>
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
        </>
      )}
    </div>
  );
};
