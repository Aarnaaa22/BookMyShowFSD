// ============================================================
// PAGE: Home.js (pages/Home.js)
// CONCEPTS USED:
//   - React Router page component
//   - State Lifting: totalSaved passed down from App.js as prop
//   - Conditional Rendering: show savings banner
// ============================================================

import React from "react";
import MovieList from "../components/MovieList";

const Home = ({ totalSaved }) => {
  return (
    <main className="page-home">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h2 className="hero-title">
          Book Your <span className="highlight">Movie Experience</span>
        </h2>
        <p className="hero-sub">
          Discover the latest blockbusters. Book tickets in seconds.
        </p>

        {/* State Lifting + Conditional Rendering: show total saved from parent */}
        {totalSaved > 0 && (
          <div className="savings-badge">
            🎉 You've booked tickets worth ₹{totalSaved} today!
          </div>
        )}
      </div>

      {/* MovieList component renders all movie cards */}
      <MovieList />
    </main>
  );
};

export default Home;
