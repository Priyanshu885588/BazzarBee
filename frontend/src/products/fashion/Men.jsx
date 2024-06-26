import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FashionProducts } from "./FashionProductsMen";
import { getmensFilterData } from "../services/api";
import { GiJumpingRope } from "react-icons/gi";
import { FilterUI } from "../../UI/FilterUI";
import { getAllmensProducts } from "../services/api";

export const Men = () => {
  const [filterData, setFilterData] = useState();
  const [priceRange, setPriceRange] = useState([]);
  const [queryString, setQueryString] = useState();
  const [isloading, setisLoading] = useState(false);
  const [sortingDropdown, setSortingDropdown] = useState({
    visibility: false,
    valueOrder: "Sort by : Recommended",
  });
  const [selectedFilters, setSelectedFilters] = useState({
    subCategory: [],
    brands: [],
    colors: [],
    price: [],
    category: ["Men's Accessories", "Men's clothing"],
  });
  const [isError, setisError] = useState(false);
  console.log(selectedFilters.category);
  const handleSortVisibility = () => {
    setSortingDropdown({
      ...sortingDropdown,
      visibility: !sortingDropdown.visibility,
    });
  };
  const changeValueOrder = (newValueOrder) => {
    setSortingDropdown({
      visibility: false,
      valueOrder: newValueOrder,
    });
  };

  const handleCheckboxChange = (event, type, value) => {
    const isChecked = event.target.checked;
    const updatedSelectedFilters = { ...selectedFilters }; // Create a copy

    if (isChecked) {
      updatedSelectedFilters[type].push(value);
    } else {
      updatedSelectedFilters[type] = updatedSelectedFilters[type].filter(
        (item) => item !== value
      );
    }
    sendQuery(updatedSelectedFilters);
    setSelectedFilters(updatedSelectedFilters);
  };

  const sendQuery = (selectedFilters) => {
    const query = new URLSearchParams({
      subCategory: selectedFilters.subCategory.join(","),
      brands: selectedFilters.brands.join(","),
      colors: selectedFilters.colors.join(","),
      priceRange: selectedFilters.price.join(","),
      category: selectedFilters.category.join(","),
    });
    setQueryString(query);
  };
  useEffect(() => {
    const fetchFilterData = async () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      try {
        setisLoading(true);
        const data = await getmensFilterData();
        setFilterData(data);
        const sum = (data.highestPrice - data.lowestPrice) / 4;
        if (selectedFilters.subCategory.length > 0) {
          sendQuery(selectedFilters);
        }
        const newPriceRange = [];
        newPriceRange.push(data.lowestPrice);
        for (let i = 1; i <= 3; i++) {
          newPriceRange.push(sum + newPriceRange[i - 1]);
        }

        newPriceRange.push(data.highestPrice);
        setPriceRange(newPriceRange);
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
      <div className="h-[70vh] w-screen flex flex-col justify-center items-center gap-2">
        <GiJumpingRope className="animate-bounce w-8 h-8" />

        <p className="opacity-85 roboto font-light text-sm animate-pulse">
          "Patience is a virtue, especially with this many amazing products!"
        </p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex w-full h-[50vh] justify-center items-center">
        <p className="text-red-500 roboto font-light">Error in fetching data</p>
      </div>
    );
  }
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
        <FilterUI
          filterData={filterData}
          handleCheckboxChange={handleCheckboxChange}
          selectedFilters={selectedFilters}
          priceRange={priceRange}
          keepChecked={false}
        />
        <div className="w-5/6">
          <div className="border-b pt-4 pb-6 h-12 flex gap-1 items-center justify-between px-4">
            <div className="flex items-center capitalize gap-4"></div>
            <div className="mr-4">
              <button
                className="py-2 px-4 border-2 flex items-center gap-8 font-normal"
                onClick={handleSortVisibility}
              >
                {sortingDropdown.valueOrder}{" "}
                {sortingDropdown.visibility ? (
                  <IoIosArrowDown className="rotate-180" />
                ) : (
                  <IoIosArrowDown />
                )}
              </button>
              {sortingDropdown.visibility && (
                <ul className="absolute bg-white border-x-2 border-b-2">
                  <li
                    className="py-2 px-4 flex items-center gap-8 hover:bg-orange-50 cursor-pointer
                    font-normal"
                    onClick={() => changeValueOrder("Sort by : Recommended")}
                  >
                    Sort by : Recommended
                  </li>
                  <li
                    className="py-2 px-4 flex items-center gap-8 hover:bg-orange-50 cursor-pointer
                    font-normal"
                    onClick={() =>
                      changeValueOrder("Sort by : Price High to low")
                    }
                  >
                    Sort by : Price {"High to low"}
                  </li>
                  <li
                    className="py-2 px-4 flex items-center gap-8 hover:bg-orange-50 cursor-pointer
                    font-normal"
                    onClick={() =>
                      changeValueOrder("Sort by : Price Low to high")
                    }
                  >
                    Sort by : Price {"Low to high"}
                  </li>
                </ul>
              )}
            </div>
          </div>
          <FashionProducts
            queryString={queryString}
            fetchProducts={getAllmensProducts}
            categ={selectedFilters.category[0]}
          />
        </div>
      </div>
    </div>
  );
};
