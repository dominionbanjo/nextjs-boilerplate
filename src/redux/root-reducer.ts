import { combineReducers } from "@reduxjs/toolkit";
import BaseAPI from "./baseApi";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import onboardingReducer from "./slices/onboardingSlice";

export const rootReducer = combineReducers({
  [BaseAPI.reducerPath]: BaseAPI.reducer,
  auth: authReducer,
  cart: cartReducer,
  onboarding: onboardingReducer,
});
