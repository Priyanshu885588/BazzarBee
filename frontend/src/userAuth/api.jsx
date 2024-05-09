import axios from "axios";
const API_URL = "http://localhost:3000/api/v1/user";

const userlogin = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const usersignUp = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const sendVerificationCode = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/emailVerification`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { userlogin, usersignUp, sendVerificationCode };
