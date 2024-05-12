import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { CiImageOn } from "react-icons/ci";
import { getSingleProduct } from "../services/api";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { BsBagHeart } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
export const SingleProduct = () => {
  const [searchParams] = useSearchParams();
  const [productData, setProductData] = useState();
  const id = searchParams.get("id");

  useEffect(() => {
    const singleFetch = async () => {
      try {
        const data = await getSingleProduct(id);
        setProductData(data.product[0]);
      } catch (error) {
        console.log(error.response);
      }
    };
    singleFetch();
  }, []);

  return (
    <div className="min-h-screen w-screen px-6">
      {productData && (
        <div className="flex w-full h-[70vh]">
          <div className="w-1/2 flex gap-2">
            <div className="w-1/2 ">
              <img
                src={`${productData.imageUrl}`}
                alt="Product image"
                className="w-full h-[95%] rounded-2xl"
              />
            </div>
            <div className="flex w-1/2 gap-2 h-full relative flex-wrap">
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
                className="w-11/12 h-1/2 rounded-xl"
                src="https://firebasestorage.googleapis.com/v0/b/bazzarbee-192fe.appspot.com/o/Fashion%2FMens%2FClothing%2FShirts%2FMen's%20Casual%20Cotton%20Shirt%2F88.jpeg?alt=media&token=372ff3ec-99ce-4e68-8a5e-0ccbacd1b90f"
              />
            </div>
          </div>
          <div className="w-fit px-2 flex flex-col justify-start items-start lato gap-6 border-r border-gray-700 ml-10 relative z-10 bg-white ">
            <div className="flex flex-col w-full  h-2/5 gap-2 ">
              <h3 className="uppercase">{productData.brandName}</h3>
              <h2 className="text-2xl font-bold">{productData.name}</h2>
              <p className="opacity-70 text-base text-gray-700">
                {productData.description}
              </p>
              <div className="flex items-center h-10 border-b border-black">
                <FaStar className="text-yellow-500 h-4 w-4" />
                <FaStar className="text-yellow-500 h-4 w-4" />
                <FaStar className="text-yellow-500 h-4 w-4" />
                <FaStar className="text-yellow-500 h-4 w-4" />
                <FaStar className="text-yellow-500 h-4 w-4" />
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
                <p className="font-semibold">Size</p>
                <div className="flex flex-col">
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
                  <div className="flex gap-2">
                    {productData.quantityAvailable.quantities.map(
                      (size, index) => (
                        <button
                          className="py-1 px-2 border-2 border-gray-300 rounded-b-lg w-12 text-sm"
                          key={index}
                          disabled
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <button className="text-xs text-yellow-500 w-fit">
                  Size Guide
                </button>
              </div>
            </div>
            <div></div>
          </div>
          <div className="h-full w-1/6">
            <div className="h-1/2 w-full flex flex-col gap-3">
              <button className="bg-black text-white flex rounded-full py-2 pr-8 pl-10 items-center gap-2 relative -left-4 shadow-inner w-fit hover:bg-orange-800 hover:border-2 overflow-hidden comeback-btn">
                <BsBagHeart />
                Add to cart
              </button>
              <button className="bg-pink-100 text-black  flex rounded-full py-2 pr-8 pl-10 items-center gap-2 relative -left-4 shadow-inner w-fit hover:bg-white hover:border-2 overflow-hidden comeback-btn">
                <FaHandHoldingHeart />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
