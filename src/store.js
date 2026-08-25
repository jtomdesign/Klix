import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/Auth/authSlice";
import savedReducer from "./features/Saved/saveSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    saved: savedReducer,
  },
});

export default store;
