import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import playerReducer from "./slices/playerSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
