import React from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  removeFromCart,
} from "../slices/cartSlice";
import { clearCart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { IoTrashBinOutline } from "react-icons/io5";
export const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  console.log(cartItems);
  const handleAddToCart = (productData) => {
    dispatch(addToCart(productData));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleRemoveCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleDecQua = (item) => {
    dispatch(decrementQuantity(item));
  };
  return (
    <div className="h-screen w-[100vw] absolute right-0 z-[9999] bg-white">
      <section className="bg-white antialiased montserrat">
        <div className="mx-auto px-4 2xl:px-0">
          <div className="text-xl font-semibold text-gray-900  sm:text-2xl text-center w-full  px-5">
            Shopping Cart
          </div>
          {cartItems.length > 0 && (
            <div
              className="font-medium flex gap-1 items-center cursor-pointer"
              onClick={handleClearCart}
            >
              Clear
              <IoTrashBinOutline />
            </div>
          )}
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                      key={index}
                    >
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img
                          className="h-32 w-24 rounded-lg"
                          src={item.imageUrl}
                          alt=""
                        />

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex flex-col gap-4 items-center w-full h-full">
                            <div className="flex items-center">
                              <button
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="counter-input"
                                onClick={() => handleDecQua(item)}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                              >
                                <FaMinus className="text-gray-600 text-sm" />
                              </button>
                              <p className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 ">
                                {item.quantity}
                              </p>
                              <button
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="counter-input"
                                onClick={() => handleAddToCart(item)}
                                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
                              >
                                <FaPlus className="text-gray-600 text-sm" />
                              </button>
                            </div>
                            <h4>&#8377;{item.price}</h4>
                          </div>

                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 "></p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <Link
                            to={`/categories/men/singleProduct?id=${item._id}`}
                            className="font-bold"
                          >
                            {item.brandName}
                            <br />
                          </Link>
                          <Link
                            to={`/categories/men/singleProduct?id=${item._id}`}
                            className="text-base  text-gray-900 hover:opacity-75 border-b border-black"
                          >
                            {item.name}
                          </Link>
                          <p className="text-sm opacity-65">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline "
                            >
                              <FaRegHeart />
                              Add to Favorites
                            </button>

                            <button
                              type="button"
                              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                              onClick={() => handleRemoveCart(item)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className=" w-full h-full relative -left-28">
                    <iframe
                      src="https://giphy.com/embed/yo6XX1ckyN3uPJynZj"
                      className="h-[50vh]"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        &#8377;{parseFloat(totalPrice.toFixed(2)) + 400}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Savings
                      </dt>
                      <dd className="text-base font-medium text-green-600">
                        &#8377;-400.00
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Store Pickup
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        &#8377;+99
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        &#8377;+99
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      &#8377;{parseFloat(totalPrice.toFixed(2)) + 99 + 99}
                    </dd>
                  </dl>
                </div>

                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1 justify-center text-sm font-medium text-primary-700 hover:underline dark:text-white"
                  >
                    Continue Shopping
                    <CiLocationArrow1 className="text-base" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
