import React from "react";
import { Footer } from "../elements/Footer";
import { Header } from "./Header";
import { MainSection } from "./MainSection";
import { Navbar } from "../elements/Navbar";
export const Home = () => {
  return (
    <div className="w-full h-full min-h-[100vh] ">
      <Navbar />
      <div className="px-16">
        <Header />
        <MainSection />
      </div>
    </div>
  );
};
