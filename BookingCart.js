// ============================================================
// COMPONENT: BookingCart.js
// CONCEPTS USED:
//   - useSelector: read booking items from Redux store
//   - useDispatch: dispatch remove/update/clear actions
//   - Conditional Rendering: empty cart message vs. cart items
//   - Event Handling: remove booking, update ticket count
//   - useContext: check if user is logged in (UserContext)
//   - State Lifting: receives confirmBooking handler from App.js via props
// ============================================================

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBooking, updateTickets, clearCart } from "../redux/bookingSlice";
import { useUser } from "../context/AppContext";

const BookingCart = ({ onBookingConfirmed }) => {
  // useSelector: read global state from Redux
  const bookings = useSelector((state) => state.bookings.items);
  const dispatch = useDispatch();

  // useContext: get user login status
  const { user } = useUser();

  // useState: local state for booking success message
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Calculate totals (derived from Redux state)
  const totalTickets = bookings.reduce((sum, item) => sum + item.tickets, 0);
  const totalAmount = bookings.reduce(
    (sum, item) => sum + item.price * item.tickets,
    0
  );

  // Event Handler: remove a single booking
  const handleRemove = (id) => {
    dispatch(removeBooking(id));
  };

  // Event Handler: update ticket count for a booking
  const handleTicketChange = (id, value) => {
    const tickets = parseInt(value);
    if (tickets >= 1 && tickets <= 10) {
      dispatch(updateTickets({ id, tickets }));
    }
  };

  // Event Handler: confirm/pay for all bookings
  const handleConfirmBooking = () => {
    if (!user) {
      alert("🔒 Please login first to confirm your booking!");
      return;
    }
    setBookingSuccess(true);
    dispatch(clearCart());
    // State Lifting: notify parent (App.js) about confirmed booking
    if (onBookingConfirmed) onBookingConfirmed(totalAmount);
  };

  // ---- CONDITIONAL RENDERING (1): Success Message ----
  if (bookingSuccess) {
    return (
      <div className="booking-success">
        <div className="success-icon">🎉</div>
        <h2>Booking Confirmed!</h2>
        <p>Your tickets have been booked successfully.</p>
        <p>Check your email for confirmation.</p>
        <button className="btn-book" onClick={() => setBookingSuccess(false)}>
          Book More Movies
        </button>
      </div>
    );
  }

  // ---- CONDITIONAL RENDERING (2): Login Required ----
  if (!user) {
    return (
      <div className="cart-container">
        <h2 className="cart-title">🎟️ Your Booking Cart</h2>
        <div className="login-required">
          <span className="lock-icon">🔒</span>
          <h3>Login Required</h3>
          <p>Please login to view and manage your cart.</p>
          <p className="hint">👆 Click the <strong>Login</strong> button in the header!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">🎟️ Your Booking Cart</h2>

      {/* ---- CONDITIONAL RENDERING (3): Empty Cart ---- */}
      {bookings.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-icon">🎭</span>
          <h3>No tickets booked yet!</h3>
          <p>Go to the Home page and click "Book Now" on a movie.</p>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="cart-items">
            {bookings.map((item) => (
              <div key={item.id} className="cart-item">
                <span className="cart-item-poster">{item.poster}</span>
                <div className="cart-item-info">
                  <h4 className="cart-item-title">{item.title}</h4>
                  <p className="cart-item-genre">{item.genre}</p>
                  <p className="cart-item-price">₹{item.price} per ticket</p>
                </div>

                <div className="cart-item-controls">
                  {/* Event Handling: ticket counter */}
                  <button
                    className="ticket-btn"
                    onClick={() =>
                      handleTicketChange(item.id, item.tickets - 1)
                    }
                    disabled={item.tickets <= 1}
                  >
                    −
                  </button>
                  <span className="ticket-count">{item.tickets}</span>
                  <button
                    className="ticket-btn"
                    onClick={() =>
                      handleTicketChange(item.id, item.tickets + 1)
                    }
                    disabled={item.tickets >= 10}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  <span>₹{item.price * item.tickets}</span>
                  {/* Event Handling: remove booking */}
                  <button
                    className="btn-remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-row">
              <span>Total Tickets:</span>
              <strong>{totalTickets}</strong>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <strong>₹{totalAmount}</strong>
            </div>
            <button className="btn-confirm" onClick={handleConfirmBooking}>
              ✅ Confirm Booking
            </button>
            <button
              className="btn-clear"
              onClick={() => dispatch(clearCart())}
            >
              🗑️ Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingCart;
