import React from "react";
import { Navbar } from "./Navbar";

export const Header = () => {
  return (
    <>
      <Navbar />
      <div class="w-full h-[70vh] flex gap-4">
        <div class="row-span-1 bg-amber-700 p-4 h-full w-3/5 rounded-3xl shadow-2xl">
          Left Column Content
        </div>
        <div className="w-2/5 h-full flex flex-col gap-4 rounded-3xl">
          <div class="row-span-2 bg-black text-white p-4 h-2/3 rounded-3xl shadow-2xl">
            {" "}
          </div>
          <div class="bg-black text-white p-2 h-1/3 rounded-3xl shadow-2xl"></div>
        </div>
      </div>
    </>
  );
};
