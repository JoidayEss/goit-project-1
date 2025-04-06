import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./carsSlice.js";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});
