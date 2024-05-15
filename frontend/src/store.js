import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import cartApiReducer from "./slices/cartApiSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
    cartApi: cartApiReducer,
  },
});

export default store;
