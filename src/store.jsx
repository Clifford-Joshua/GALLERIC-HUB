import { configureStore } from "@reduxjs/toolkit";
import pexelReducer from "./Features/pexelSlice.jsx";

export const store = configureStore({
  reducer: {
    pexel: pexelReducer,
  },
});
