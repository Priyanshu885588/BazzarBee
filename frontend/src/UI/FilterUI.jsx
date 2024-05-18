import React from "react";

export const FilterUI = ({
  filterData,
  handleCheckboxChange,
  selectedFilters,
  priceRange,
  keepChecked,
}) => {
  return (
    <>
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
                    checked={
                      selectedFilters.subCategory.includes(data) || keepChecked
                    }
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
            <ul className="py-4 h-40 overflow-scroll">
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
            <ul className="py-4 h-40 overflow-scroll">
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
    </>
  );
};
