import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FashionProducts } from "./FashionProducts";
import { getmensFilterData } from "../services/api";
import { GiJumpingRope } from "react-icons/gi";
export const Men = () => {
  const [filterData, setFilterData] = useState();
  const [priceRange, setPriceRange] = useState([]);
  const [queryString, setQueryString] = useState();
  const [isloading, setisLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    subCategory: [],
    brands: [],
    colors: [], // Add other filter properties if needed
    price: [],
  });
  const [isError, setisError] = useState(false);

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
    setSelectedFilters(updatedSelectedFilters);
    sendQuery();
  };

  const sendQuery = () => {
    const query = new URLSearchParams({
      subCategory: selectedFilters.subCategory.join(","),
      brands: selectedFilters.brands.join(","),
      colors: selectedFilters.colors.join(","),
      priceRange: selectedFilters.price.join(","),
    });
    setQueryString(query);
  };
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setisLoading(true);
        const data = await getmensFilterData();
        setFilterData(data);
        const sum = (data.highestPrice - data.lowestPrice) / 4;

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
        {filterData && (
          <div className="w-1/5">
            <div className="border-b py-4 h-12">
              <span className="uppercase font-bold text-base">Filters</span>
            </div>
            <div className="border-b py-4 ">
              <span className="uppercase font-bold my-4">subCategory</span>
              <ul className="py-4">
                {filterData.subcategories.map((data, index) => (
                  <li className="flex gap-2" key={index}>
                    <input
                      type="checkbox"
                      className="capitalize"
                      checked={selectedFilters.subCategory.includes(data)}
                      onChange={(event) =>
                        handleCheckboxChange(event, "subCategory", data)
                      }
                    />
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
                    <input
                      type="checkbox"
                      className="capitalize"
                      checked={selectedFilters.brands.includes(data)} // Set checked based on state
                      onChange={(event) =>
                        handleCheckboxChange(event, "brands", data)
                      }
                    />
                    <p className="capitalize">{data}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b py-4">
              <span className="uppercase font-bold my-4">Price</span>
              <ul className="py-4">
                {priceRange.map((rangeStart, index) => (
                  <li className="flex gap-2 " key={index}>
                    <input
                      type="checkbox"
                      name={`price-${index}`} // Add unique names for checkboxes
                      id={`price-${index}`} // Add unique IDs for accessibility
                      value={`${rangeStart}-${
                        priceRange[index + 1] || filterData.highestPrice
                      }`} // Set value with range
                      checked={selectedFilters.price.includes(
                        `${rangeStart}-${
                          priceRange[index + 1] || filterData.highestPrice
                        }`
                      )} // Check based on selectedFilters.price array
                      onChange={(event) =>
                        handleCheckboxChange(event, "price", event.target.value)
                      }
                    />
                    <label htmlFor={`price-${index}`}>
                      Rs. {rangeStart} to Rs.{" "}
                      {priceRange[index + 1] || filterData.highestPrice}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b py-4">
              <span className="uppercase font-bold my-4">Color</span>
              <ul className="py-4">
                {filterData.colors.map((data, index) => (
                  <li className="flex gap-2 items-center" key={index}>
                    <input
                      type="checkbox"
                      className="capitalize"
                      checked={selectedFilters.colors.includes(data)} // Set checked based on state
                      onChange={(event) =>
                        handleCheckboxChange(event, "colors", data)
                      }
                    />
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
          <FashionProducts queryString={queryString} />
        </div>
      </div>
    </div>
  );
};
