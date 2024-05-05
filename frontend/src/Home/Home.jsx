import React from "react";
import { Footer } from "../elements/Footer";
import { Header } from "./Header";
import { MainSection } from "./MainSection";
export const Home = () => {
  return (
    <div className="w-full h-full min-h-[100vh] px-16 py-8">
      <Header />
      <MainSection />
    </div>
  );
};
