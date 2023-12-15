import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "../features/CartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.dispatch(getTotals());
