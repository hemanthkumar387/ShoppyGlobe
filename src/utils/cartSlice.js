import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  cartItems: [], // Array to store cart items
  totalQuantity: 0, // Total number of items in the cart
  totalPrice: 0, // Total price of all items in the cart
};

// Create a Redux slice for managing cart state
const cartSlice = createSlice({
  name: "cart", // Slice name
  initialState, // Initial state
  reducers: {
    // Reducer to add an item to the cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // If item is new, add it to the cart with a quantity of 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      // Update total quantity and price
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
    },

    // Reducer to remove an item from the cart
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
      if (itemIndex > -1) {
        // Deduct the total quantity and price before removing the item
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.totalPrice -= state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
        // Remove item from the cart
        state.cartItems.splice(itemIndex, 1);
      }
    },

    // Reducer to update the quantity of an item in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        // Adjust total quantity and total price based on new quantity
        state.totalQuantity += quantity - item.quantity;
        state.totalPrice += (quantity - item.quantity) * item.price;
        // Update the item's quantity
        item.quantity = quantity;
      }
    },
    // Reducer to clear all items from the cart
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Exporting actions for use in components
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// Exporting reducer to be used in the Redux store
export default cartSlice.reducer;
