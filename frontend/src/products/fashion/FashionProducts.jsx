import React from "react";
import { Cards } from "../../UI/Cards";
import { useEffect, useState } from "react";
import { getAllmensProducts } from "../services/api";
export const FashionProducts = () => {
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllmensProducts();
        setProductsData(data.products);
      } catch (error) {}
    };
    fetchProducts();
  }, []);
  return (
    <div className="p-6">
      <div className="flex w-full h-fit flex-wrap gap-4">
        {productsData.map((product) => (
          <Cards key={product.productId} data={product} />
        ))}
      </div>
    </div>
  );
};
