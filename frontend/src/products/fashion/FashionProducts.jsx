import React from "react";
import { Cards } from "../../UI/Cards";
export const FashionProducts = () => {
  const cards = [...Array(10)]; // Create an array with 8 elements
  return (
    <div>
      <div className="flex w-full h-fit flex-wrap gap-4">
        {cards.map((_, index) => (
          <Cards key={index} />
        ))}
      </div>
    </div>
  );
};
