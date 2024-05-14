import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  cartVisible: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, price } = action.payload;
      console.log(_id);
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === _id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      state.totalQuantity++;
      state.totalPrice += price;
    },
    removeFromCart: (state, action) => {
      const { _id, price, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item._id === _id);

      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);
        state.totalQuantity -= quantity;
        state.totalPrice -= price * quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const { _id } = action.payload;
      const item = state.cartItems.find((item) => item._id === _id);

      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalPrice -= item.price;
      }
    },
    clearCart: (state) => {
      // Reset cart state to initial values
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, clearCart, removeFromCart, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
