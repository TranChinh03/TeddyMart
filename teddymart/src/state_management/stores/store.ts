import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "state_management/reducers/rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});
