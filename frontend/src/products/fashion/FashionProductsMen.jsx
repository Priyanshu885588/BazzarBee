import React from "react";
import { Cards } from "../../UI/Cards";
import { useEffect, useState } from "react";
import { TbCube3dSphere } from "react-icons/tb";
import { getAllmensProducts, getFilteredData } from "../services/api";
import { useNavigate } from "react-router-dom";

export const FashionProducts = ({ queryString, fetchProducts, categ }) => {
  const [productsData, setProductsData] = useState([]);
  const [isloading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const navigate = useNavigate();
  const handleChange = (id) => {
    if (categ[0].charAt(0) == "M") {
      navigate(`/categories/men/singleProduct?id=${id}`);
    } else if (categ[0].charAt(0) == "W") {
      navigate(`/categories/Women/singleProduct?id=${id}`);
    }
  };

  useEffect(() => {
    const fetchProducts1 = async () => {
      try {
        setisLoading(true);
        if (queryString) {
          const data = await getFilteredData(queryString);
          setProductsData(data.products);
        } else {
          const data = await fetchProducts();
          setProductsData(data.products);
        }
      } catch (error) {
        console.log("Error in fetching products");
        setisError(true);
      } finally {
        setisLoading(false);
        setTimeout(() => {
          setisError(false);
        }, 4000);
      }
    };
    fetchProducts1();
  }, [queryString]);

  if (isError) {
    return (
      <div className="flex w-full h-[50vh] justify-center items-center">
        <p className="text-red-500 roboto font-light">
          Error in fetching products
        </p>
      </div>
    );
  }

  if (isloading) {
    return (
      <div className="flex w-full h-[50vh] justify-center items-center">
        <TbCube3dSphere className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex w-full h-fit flex-wrap gap-4">
        {productsData.length > 0 ? (
          productsData.map((product) => (
            <div key={product._id} onClick={() => handleChange(product._id)}>
              <Cards data={product} />
            </div>
          ))
        ) : (
          <p className="text-center w-full">No products available</p>
        )}
      </div>
    </div>
  );
};
