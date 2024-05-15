import axios from "axios";
const API_URL = "https://bazzar-bee-rzpp.vercel.app/api/v1/product";

const getAllmensProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/fashion/men`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
const getFilteredData = async (queryString) => {
  try {
    const response = await axios.get(
      `${API_URL}/fashion/filter?${queryString.toString()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getmensFilterData = async () => {
  try {
    const response = await axios.get(`${API_URL}/fashion/men/filterdata`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCategoryData = async () => {
  try {
    const response = await axios.get(`${API_URL}/category-data`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSingleProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/single-product?Id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getParticulatCategoryProducts = async (category, subCategory) => {
  try {
    const response = await axios.get(
      `${API_URL}/category-products?category=${category}&subCategory=${subCategory}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllmensProducts,
  getmensFilterData,
  getFilteredData,
  getSingleProduct,
  getCategoryData,
  getParticulatCategoryProducts,
};
