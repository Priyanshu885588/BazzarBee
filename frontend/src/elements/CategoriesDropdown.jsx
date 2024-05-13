import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategoryData } from "../products/services/api";
import { GiJumpingRope } from "react-icons/gi";

export const CategoriesDropdown = () => {
  const [categoryData, setCategorydata] = useState();
  const [isloading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);

  const navigate = useNavigate();

  const naivgatePages = (mark, category = "", subCategory = "") => {
    navigate(
      `/categories/${mark}-${subCategory}?category=${category}&subCategory=${mark}-${subCategory}`
    );
  };

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setisLoading(true);
        const data = await getCategoryData();
        setCategorydata(data);
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
      {categoryData && (
        <>
          <div className=" h-full w-full text-sm flex flex-col justify-start">
            <h5 className=" roboto text-orange-500 font-semibold text-left border-b-2 pb-2">
              Fashion & Clothing
            </h5>
            <Link
              className="roboto text-orange-500 font-semibold text-left pt-3 mb-1 hover:text-orange-700"
              to="/categories/men"
            >
              Men's
            </Link>
            <ul className="text-left flex flex-col gap-1 ">
              {categoryData.subcategories[0].map((data, index) => (
                <li
                  className="hover:font-bold cursor-pointer"
                  key={index}
                  onClick={() => naivgatePages("men", "fashion", data)}
                >
                  {data}
                </li>
              ))}
            </ul>
            <h6 className=" roboto text-orange-500 font-semibold text-left mt-2 mb-1 border-t pt-2">
              Women's
            </h6>
            <ul className="text-left flex flex-col gap-1 ">
              {categoryData.subcategories[1].map((data, index) => (
                <li
                  className="hover:font-bold cursor-pointer"
                  key={index}
                  onClick={() => naivgatePages("men", data)}
                >
                  {data}
                </li>
              ))}
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
