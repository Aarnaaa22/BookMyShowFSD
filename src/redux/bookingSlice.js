// ============================================================
// REACT CONCEPT: Redux - bookingSlice.js
// createSlice auto-generates action creators + reducers.
// Think of a "slice" as one section of the global state.
//
// State shape: { items: [ { id, title, tickets, price, poster } ] }
// Actions:
//   addBooking    - add a new booking (or increment tickets)
//   removeBooking - remove a booking entirely
//   updateTickets - change ticket count for an existing booking
// ============================================================

import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    items: [], // array of booked movies
  },
  reducers: {
    // EVENT HANDLING (via dispatch): Add a movie to cart
    addBooking: (state, action) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        // If already booked, just increase ticket count
        existing.tickets += 1;
      } else {
        state.items.push({ ...action.payload, tickets: 1 });
      }
    },

    // EVENT HANDLING (via dispatch): Remove a movie from cart
    removeBooking: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // EVENT HANDLING (via dispatch): Update ticket count
    updateTickets: (state, action) => {
      const { id, tickets } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.tickets = tickets;
      }
    },

    // Clear the entire cart
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addBooking, removeBooking, updateTickets, clearCart } =
  bookingSlice.actions;

export default bookingSlice.reducer;
