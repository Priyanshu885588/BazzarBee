import React from "react";
import { Cards } from "./UI/Cards";
import LogoImage from "../assets/blacklogo.png";

export const MainSection = () => {
  const cards = [...Array(10)]; // Create an array with 8 elements
  return (
    <div className="mt-5 flex flex-col gap-6">
      <div className="flex w-full h-[80vh] bg-black rounded-3xl p-2">
        <div className="w-1/2 h-full rounded-3xl flex flex-col text-white items-start p-4 gap-2">
          <button className="py-1 px-6 border-2 rounded-full">Fashion</button>
          <h1 className="text-6xl montserrat w-full">
            Immerse Yourself in a New Dimension of Fashion
          </h1>
          <p className="p-2 lato opacity-80">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores
            dolorum culpa, et sint ipsa reiciendis!
          </p>
          <button className="py-2 bg-white text-black font-bold px-6 border-2 rounded-full">
            Add to cart
          </button>
        </div>
        <div className="w-1/2 h-full rounded-3xl flex flex-col p-5 gap-4 items-center">
          <div className="w-3/5 h-1/2 rounded-2xl">
            <img
              src="https://images.pexels.com/photos/8088689/pexels-photo-8088689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="w-full h-full rounded-2xl"
            />
          </div>
          <div className="w-full h-1/2 flex gap-4">
            <div className="w-1/2 h-full rounded-2xl">
              <img
                src="https://images.pexels.com/photos/4556677/pexels-photo-4556677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full rounded-2xl"
              />
            </div>
            <div className="w-1/2 h-full rounded-2xl">
              <img
                src="https://images.pexels.com/photos/7236120/pexels-photo-7236120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-fit flex-wrap gap-2">
        {cards.map((_, index) => (
          <Cards key={index} />
        ))}
      </div>
      <section className="relative isolate overflow-hidden bg-white px-6 py-8 lg:px-8 rounded-2xl">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-indigo-100 to-white opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-200 origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img className="mx-auto h-16 w-40" src={LogoImage} alt="" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                expedita voluptas culpa sapiente alias molestiae. Numquam
                corrupti in laborum sed rerum et corporis.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">
                  Priyanshu Mandani
                </div>
                <svg
                  viewBox="0 0 2 2"
                  width="3"
                  height="3"
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx="1" cy="1" r="1" />
                </svg>
                <div className="text-gray-600">CEO of BazzarBee</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
};
