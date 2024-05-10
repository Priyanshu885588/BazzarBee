import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Men } from "./fashion/Men";
import { Navbar } from "../elements/Navbar";

export const ProductsMain = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/men" element={<Men />} />
      </Routes>
    </>
  );
};
