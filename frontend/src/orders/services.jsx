import axios from "axios";
const API_URL = "https://bazzar-bee-rzpp.vercel.app/api/v1/orders";

const getAddressInfo = async () => {
  try {
    const token = localStorage.getItem("BazzarBeeToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/fetchuseraddress`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const addAddressInfo = async (data) => {
  try {
    const token = localStorage.getItem("BazzarBeeToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_URL}/adduseraddress`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const placeOrder = async (data) => {
  try {
    const token = localStorage.getItem("BazzarBeeToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(
      `${API_URL}/checkout-session`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getAddressInfo, addAddressInfo, placeOrder };
