// ============================================================
// COMPONENT: MovieCard.js
// CONCEPTS USED:
//   - Functional Component with Props
//   - Event Handling (Book Now button click)
//   - useDispatch (Redux): dispatch addBooking action
//   - Conditional Rendering: show genre badge
// ============================================================

import React from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/bookingSlice";

const MovieCard = ({ movie }) => {
  // useDispatch: get dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  // Event Handler: when user clicks "Book Now"
  const handleBookNow = () => {
    // Dispatch addBooking action with movie details
    dispatch(
      addBooking({
        id: movie.id,
        title: movie.title,
        price: movie.price,
        poster: movie.poster,
        genre: movie.genre,
      })
    );
  };

  return (
    <div className="movie-card">
      {/* Poster area with emoji as placeholder */}
      <div className="movie-poster">
        <span className="poster-emoji">{movie.poster}</span>
        <span className="movie-genre-badge">{movie.genre}</span>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-language">{movie.language} • {movie.duration}</p>
        <div className="movie-meta">
          <span className="movie-rating">⭐ {movie.rating}</span>
          <span className="movie-price">₹{movie.price}</span>
        </div>
        <p className="movie-desc">{movie.description}</p>

        {/* Event Handling: Book Now button */}
        <button className="btn-book" onClick={handleBookNow}>
          🎟️ Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
