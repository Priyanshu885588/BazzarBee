import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../../elements/Navbar";
import { SingleProduct } from "./SingleProduct";
export const FashionRoutesPage = () => {
  return (
    <>
      <Routes>
        <Route path="/singleProduct" element={<SingleProduct />} />
      </Routes>
    </>
  );
};
