import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Creating the Redux store and adding reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Assigning the cart slice reducer to the "cart" state
  },
});
