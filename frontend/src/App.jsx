import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/Home";
import { Footer } from "./elements/Footer";
import { Login } from "./userAuth/login";
import { SignUp } from "./userAuth/signUp";
import "./App.css";

function App() {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/userlogin", element: <Login /> },
    { path: "/sign-up", element: <SignUp /> },
  ];
  return (
    <>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
