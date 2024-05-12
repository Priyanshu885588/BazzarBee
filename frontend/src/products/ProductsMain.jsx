import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Men } from "./fashion/Men";
import { Navbar } from "../elements/Navbar";
import { useSearchParams } from "react-router-dom";
import { FashionRoutesPage } from "./fashion/FashionRoutesPage";

export const ProductsMain = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/men" element={<Men category={category} />} />
        <Route path="/men/*" element={<FashionRoutesPage />} />
      </Routes>
    </>
  );
};
