import React from "react";
import { Link } from "react-router-dom";

export const Success = () => {
  return (
    <div class="h-screen flex justify-center items-center bg-svg">
      <div class="backdrop-blur-md border-white p-6  md:mx-auto rounded-3xl shadow-2xl">
        <svg viewBox="0 0 24 24" class="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div class="text-center">
          <h3 class="md:text-2xl text-base text-white font-semibold text-center">
            Payment Done!
          </h3>
          <p class="text-white my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-white"> Your order is placed </p>
          <div class="py-10 text-center">
            <Link
              to="/"
              class="px-12 bg-orange-100 hover:bg-orange-500 text-amber-900 font-semibold py-3 rounded-full"
            >
              HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
