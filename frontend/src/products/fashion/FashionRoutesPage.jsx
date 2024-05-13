import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../../elements/Navbar";
import { SingleProduct } from "./SingleProduct";
import { DynamicSelectedCategory } from "./DynamicSelectedCategory";
export const FashionRoutesPage = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<DynamicSelectedCategory />} />
        <Route path="/singleProduct" element={<SingleProduct />} />
      </Routes>
    </>
  );
};
