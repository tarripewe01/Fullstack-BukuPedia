import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import BookReducer from "./features/bookSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    book: BookReducer,
  },
});
