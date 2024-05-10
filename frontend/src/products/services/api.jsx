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

const getmensFilterData = async () => {
  try {
    const response = await axios.get(`${API_URL}/fashion/men/filterdata`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAllmensProducts, getmensFilterData };
