import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "state_management/reducers/rootReducer";
export const store = configureStore({
  reducer: rootReducer,
});
