"use client";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/slice/authSlice";

export const store = configureStore({
  reducer: {
    authSlice,
  },
});
