import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./Home/Home";
import { Footer } from "./elements/Footer";
import { Login } from "./userAuth/login";
import { SignUp } from "./userAuth/signUp";

import "./App.css";
import { ProductsMain } from "./products/ProductsMain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/categories/*" element={<ProductsMain />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
