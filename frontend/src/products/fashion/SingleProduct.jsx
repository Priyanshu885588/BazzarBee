import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TbCube3dSphere } from "react-icons/tb";
import { getFilteredData, getSingleProduct } from "../services/api";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { BsBagHeart } from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { SmallCards } from "../../UI/SmallCards";
import { Cards } from "../../UI/Cards";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { addItemToCart } from "../../slices/cartApiSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
export const SingleProduct = () => {
  const [searchParams] = useSearchParams();
  const [productData, setProductData] = useState();
  const [suggestionProductsData, setSuggestionProductsData] = useState([]);
  const [suggestionProductsData1, setSuggestionProductsData1] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(false);
  const navigate = useNavigate();
  const [isError, setisError] = useState(false);
  const id = searchParams.get("id");
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    const token = localStorage.getItem("BazzarBeeToken");
    if (!token) {
      navigate("/userlogin");
    }
    if (!selectedSize) {
      toast.error("Please select the size");
      return;
    }
    toast.loading("Loading");
    dispatch(
      addItemToCart({
        items: [
          {
            productId: productData._id,
            name: productData.name,
            description: productData.description,
            quantity: 1,
            price: productData.price,
            total: productData.price,
            attributes: { size: selectedSize, color: productData.color },
            image: productData.imageUrl,
          },
        ],
      })
    )
      .then((response) => {
        toast.dismiss();
        toast.success("Great choice!");
      })
      .catch((error) => {
        console.error("Failed to add item to cart:", error);
        toast.dismiss();
        toast.error("Failed to add item to cart:");
      });
    dispatch(addToCart(productData));
  };
  const singleFetch = async (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    try {
      setisLoading(true);
      const data = await getSingleProduct(id);
      const starCount = Math.floor(data.product[0].averageRating);
      data.product[0]["starCount"] = starCount;
      let ratingSum = 0;
      data.product[0].ratings.map((rating) => {
        ratingSum += rating;
      });
      let indiperc = [];
      data.product[0].ratings.map((rating, index) => {
        let p = Math.floor((rating / ratingSum) * 100).toString() + "%";

        indiperc.push(p);
      });
      data.product[0]["ratingRate"] = indiperc;

      setProductData(data.product[0]);
      console.log(data.product[0].category.charAt(0));
      if (data.product[0].category.charAt(1) == "M") {
        if (
          data.product[0].subCategory == "Shoes" ||
          data.product[0].subCategory == "Belts"
        ) {
          const query = new URLSearchParams({
            subCategory: "Shirts,Pants",
            category: "Men's clothing",
          });
          const sug1data = await getFilteredData(query);

          setSuggestionProductsData(sug1data.products);
        } else {
          const query = new URLSearchParams({
            subCategory: "Shoes,Belts",
            category: "Men's Accessories",
          });
          const sug1data = await getFilteredData(query);
          setSuggestionProductsData(sug1data.products);
        }
      } else {
        if (
          data.product[0].subCategory == "Handbags" ||
          data.product[0].subCategory == "Jewelry" ||
          data.product[0].subCategory == "Footwear"
        ) {
          const sug1data = await getFilteredData(
            `subCategory=Dresses,Tops&category=`
          );
          setSuggestionProductsData(sug1data.products);
        } else {
          const sug1data = await getFilteredData(
            `subCategory=Handbags,Jewelry`
          );
          console.log(sug1data);
          setSuggestionProductsData(sug1data.products);
        }
      }
      const sugdata = await getFilteredData(
        `subCategory=${data.product[0].subCategory}`
      );
      setSuggestionProductsData1(sugdata.products);
    } catch (error) {
      setisError(true);
    } finally {
      setisLoading(false);
      setTimeout(() => {
        setisError(false);
      }, 4000);
    }
  };
  useEffect(() => {
    singleFetch(id);
  }, []);

  if (isError) {
    return (
      <div className="flex w-full h-[50vh] justify-center items-center">
        <p className="text-red-500 roboto font-light">
          Error in fetching products
        </p>
      </div>
    );
  }

  if (isloading) {
    return (
      <div className="flex w-full h-[90vh] justify-center items-center">
        <TbCube3dSphere className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen px-6">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            padding: "16px",
            color: "#ffffff",
            backgroundColor: "#000000",
          },
        }}
      />
      {productData && (
        <>
          <div className="flex w-full h-[70vh] justify-center">
            <div className="w-1/4 flex gap-2 justify-end">
              <img
                src={`${productData.imageUrl}`}
                alt="Product image"
                className="w-[100%] h-[100%] rounded-2xl"
              />
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
                  <p className=" ml-2">
                    {productData.averageRating.toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 border-b w-1/2 pb-2">
                <h1 className="text-3xl font-extrabold roboto relative">
                  &#8377;{productData.price}
                </h1>
                <p className="font-semibold text-xs text-orange-400">
                  Inclusive all of taxes
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <span className="font-semibold">Color</span> -{" "}
                  <span className="">{productData.color.split(" ")[0]}</span>
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

                  <div className="flex gap-2 flex-wrap">
                    {productData.quantityAvailable.sizes.map((size, index) =>
                      productData.quantityAvailable.quantities[index] > 0 ? (
                        <button
                          className={`py-1 px-2 border-2 border-gray-300 rounded-t-lg hover:scale-110 w-12 text-sm ${
                            size === selectedSize ? "bg-black text-white" : ""
                          }`}
                          key={index}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ) : (
                        <button
                          className={`py-0.5 px-1 w-8 text-xs line-through`}
                          disabled
                          key={index}
                        >
                          {size}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="h-full w-1/3">
              <div className="h-1/3 w-full flex flex-col gap-3">
                <button
                  className="bg-black text-white flex rounded-full py-2 pr-8 pl-10 items-center gap-2 relative -left-4 shadow-inner w-fit hover:bg-white hover:text-black overflow-hidden comeback-btn"
                  onClick={handleAddToCart}
                >
                  <BsBagHeart />
                  Add to cart
                </button>
                <button className="bg-pink-100 text-black  flex rounded-full py-2 pr-8 pl-10 items-center gap-2 relative -left-4 shadow-inner w-fit hover:bg-white  overflow-hidden comeback-btn">
                  <FaHandHoldingHeart />
                  Wishlist
                </button>
              </div>
              <div className="h-2/3 w-full relative">
                <div className="p-4 h-fit">
                  <h5 className="uppercase font-semibold mb-4">
                    Featured products
                  </h5>
                  <div className="flex w-full h-fit gap-4 overflow-x-scroll">
                    {suggestionProductsData1.length > 0 ? (
                      suggestionProductsData1.map((product) => (
                        <div
                          key={product._id}
                          onClick={() => singleFetch(product._id)}
                        >
                          <SmallCards data={product} />
                        </div>
                      ))
                    ) : (
                      <p className="text-center w-full">
                        No products available
                      </p>
                    )}
                  </div>
                </div>
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
                    {productData.averageRating.toFixed(1)}
                  </p>
                </div>
                <div className="flex pt-4 border-t border-black h-fit flex-col">
                  {productData.ratings
                    .slice()
                    .reverse()
                    .map((data, index) => (
                      <div
                        className="flex gap-2 items-center justify-center text-gray-400 w-full"
                        key={index}
                      >
                        <span className="w-fit">{5 - index}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`bg-yellow-500 h-2.5 rounded-full animate-pulse`}
                            style={{
                              width: `${productData.ratingRate[4 - index]}`,
                            }}
                          ></div>
                        </div>
                        <span className="w-fit">{data}</span>
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
