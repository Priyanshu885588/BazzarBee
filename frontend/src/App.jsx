import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./Home/Home";
import { Footer } from "./elements/Footer";
import { Login } from "./userAuth/login";
import { SignUp } from "./userAuth/signUp";
import "./App.css";
import { ProductsMain } from "./products/ProductsMain";
import { Cart } from "./elements/Cart";
import { PrivateRoute } from "./elements/PrivateRoute";
import { CheckoutAddress } from "./orders/CheckoutAddress";
import { Success } from "./orders/Success";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/categories/*" element={<ProductsMain />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutAddress />} />
          <Route path="/orders/success" element={<Success />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
