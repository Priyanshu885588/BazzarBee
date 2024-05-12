import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { getMensFilteredData, getSingleProduct } from "../services/api";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { BsBagHeart } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";

import { Cards } from "../../UI/Cards";

export const SingleProduct = () => {
  const [searchParams] = useSearchParams();
  const [productData, setProductData] = useState();
  const [suggestionProductsData, setSuggestionProductsData] = useState([]);
  const id = searchParams.get("id");

  const singleFetch = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      const data = await getSingleProduct(id);
      const starCount = Math.floor(data.product[0].averageRating);
      data.product[0]["starCount"] = starCount;
      setProductData(data.product[0]);
      const sugdata = await getMensFilteredData(
        `subCategory=${data.product[0].subCategory}`
      );
      setSuggestionProductsData(sugdata.products);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    singleFetch(id);
  }, []);

  return (
    <div className="min-h-screen w-screen px-6">
      {productData && (
        <>
          <div className="flex w-full h-[70vh]">
            <div className="w-1/2 flex gap-2">
              <div className="w-1/2 flex justify-end">
                <img
                  src={`${productData.imageUrl}`}
                  alt="Product image"
                  className="w-[85%] h-[80%] rounded-2xl"
                />
              </div>
              <div className="flex w-1/2 h-full relative flex-wrap">
                <div className="flex w-full justify-between h-1/2 relative gap-2">
                  <img
                    className="w-1/2 h-full rounded-xl"
                    src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/Fashion%2FMens%2FClothing%2FShirts%2FMen's%20Casual%20Cotton%20Shirt%2F1st.jpeg?alt=media&token=67c07729-e481-4443-9d8b-54c398652931"
                  />
                  <img
                    className="w-1/2 h-full rounded-xl"
                    src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/Fashion%2FMens%2FClothing%2FShirts%2FMen's%20Casual%20Cotton%20Shirt%2F2nd.jpeg?alt=media&token=f730faa3-5a9f-46f8-ad4c-7bbcbc0a2ffa"
                  />
                </div>
                <img
                  className="w-11/12 h-[45%] rounded-xl"
                  src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/Fashion%2FMens%2FClothing%2FShirts%2FMen's%20Casual%20Cotton%20Shirt%2F88.jpeg?alt=media&token=372ff3ec-99ce-4e68-8a5e-0ccbacd1b90f"
                />
              </div>
            </div>
            <div className="w-1/3 px-2 flex flex-col justify-start items-start lato gap-6 border-r border-gray-700 ml-10 relative z-10 bg-white ">
              <div className="flex flex-col w-full  h-2/5 gap-2 ">
                <h3 className="uppercase">{productData.brandName}</h3>
                <h2 className="text-2xl font-bold">{productData.name}</h2>
                <p className="opacity-70 text-base text-gray-700">
                  {productData.description}
                </p>
                <div className="flex items-center h-10 border-b border-black">
                  {[...Array(productData.starCount)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-500 h-4 w-4" />
                  ))}
                  {[...Array(5 - productData.starCount)].map((_, index) => (
                    <FaStar key={index} className="text-gray-300 h-4 w-4" />
                  ))}
                  <p className=" ml-2">{productData.averageRating}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b w-1/2 pb-2">
                <h1 className="text-3xl font-extrabold roboto">
                  &#8377;{productData.price}
                </h1>
                <p className="font-semibold text-xs text-orange-400">
                  Inclusive all of taxes
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <span className="font-semibold">Color</span> -{" "}
                  <span
                    className=""
                    style={{ color: productData.color.split(" ")[1] }}
                  >
                    {productData.color.split(" ")[0]}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full border-2"
                    style={{ backgroundColor: productData.color.split(" ")[1] }}
                  ></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-semibold flex gap-2">
                    Size
                    <button className="text-xs text-yellow-500 w-fit font-light">
                      size guide
                    </button>
                  </div>

                  <div className="flex gap-2">
                    {productData.quantityAvailable.sizes.map((size, index) => (
                      <button
                        className="py-1 px-2 border-2 border-gray-300 rounded-t-lg hover:scale-110 w-12 text-sm"
                        key={index}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="h-full w-1/6">
              <div className="h-1/2 w-full flex flex-col gap-3">
                <button className="bg-black text-white flex rounded-full py-2 pr-8 pl-10 items-center gap-2 relative -left-4 shadow-inner w-fit hover:bg-white hover:text-black overflow-hidden comeback-btn">
                  <BsBagHeart />
                  Add to cart
                </button>
                <button className="bg-pink-100 text-black  flex rounded-full py-2 pr-8 pl-10 items-center gap-2 relative -left-4 shadow-inner w-fit hover:bg-white  overflow-hidden comeback-btn">
                  <FaHandHoldingHeart />
                  Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[70vh] border-t mt-8 py-2 justify-between">
            <div className="w-2/3 h-full"></div>
            <div className="flex flex-col w-1/4">
              <div className="h-2/3 p-4">
                <div className="flex items-center border-b border-black justify-between pb-4">
                  <div className="flex">
                    {[...Array(productData.starCount)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-500 h-6 w-6" />
                    ))}
                    {[...Array(5 - productData.starCount)].map((_, index) => (
                      <FaStar key={index} className="text-gray-300 h-6 w-6" />
                    ))}
                  </div>
                  <p className=" ml-2 text-2xl font-extrabold">
                    {productData.averageRating}
                  </p>
                </div>
                <div className="flex pt-4 border-t border-black h-fit flex-col">
                  {productData.ratings.map((data, index) => (
                    <div
                      className="flex gap-2 items-center justify-center text-gray-400"
                      key={index}
                    >
                      {5 - index}
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className={`bg-yellow-400 h-2.5 rounded-full w-[10%]`}
                        ></div>
                      </div>
                      {data}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center items-center h-1/2 bg-slate-200 m-4 opacity-50">
                Advertisement
              </div>
              <div className=""></div>
            </div>
          </div>
          <div className="border-x-2 p-4">
            <h5 className="uppercase font-semibold mb-4">Featured products</h5>
            <div className="flex w-full h-fit gap-4 overflow-x-scroll">
              {suggestionProductsData.length > 0 ? (
                suggestionProductsData.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => singleFetch(product._id)}
                  >
                    <Cards data={product} />
                  </div>
                ))
              ) : (
                <p className="text-center w-full">No products available</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
