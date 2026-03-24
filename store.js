// ============================================================
// REACT CONCEPT: Redux - store.js
// configureStore combines all slices (reducers) into one store.
// The store holds the GLOBAL state of the application.
// ============================================================

import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";

const store = configureStore({
  reducer: {
    bookings: bookingReducer, // bookings slice handles cart state
  },
});

export default store;
