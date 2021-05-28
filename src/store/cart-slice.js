import { createSlice } from "@reduxjs/toolkit";

createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const exitstingItem = state.items.find((item) => item.id === newItem.id);
      if (!exitstingItem) {
        state.items.push({
          itemId: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exitstingItem.quantity++;
        exitstingItem.totalPrice = exitstingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart() {},
  },
});

export default cartSlice;
