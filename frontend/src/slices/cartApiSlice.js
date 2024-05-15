import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios
const API_URL = "https://bazzar-bee-rzpp.vercel.app/api/v1/orders";
export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async () => {
    const token = localStorage.getItem("BazzarBeeToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/getcartproducts`, config); // Use axios.get instead of api.get
    return response.data;
  }
);

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item) => {
    const token = localStorage.getItem("BazzarBeeToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API_URL}/addtocart`, item, config); // Use axios.post instead of api.post
    console.log(response);
    return response.data;
  }
);

export const DecItemFromCart = createAsyncThunk(
  "cart/DecItemFromCart",
  async (itemId) => {
    const token = localStorage.getItem("BazzarBeeToken");
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(
      `${API_URL}/removeProduct?productId=${itemId}&quantity=1`,
      config
    ); // Use axios.delete instead of api.delete
    return itemId;
  }
);

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartVisible: false,
  isLoading: false,
  error: null,
};

export const cartApiSlice = createSlice({
  name: "cartApi",
  initialState,
  Reducers: {
    [fetchCartData.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchCartData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
    [fetchCartData.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    [addItemToCart.fulfilled]: (state, action) => {
      const { item, price } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity++;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += price;
    },
    [DecItemFromCart.fulfilled]: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === itemId
      );

      if (itemIndex !== -1) {
        const { quantity, price } = state.cartItems[itemIndex];
        state.cartItems.splice(itemIndex, 1);
        state.totalQuantity -= quantity;
        state.totalPrice -= price * quantity;
      }
    },
  },
});

export default cartApiSlice.reducer;
