// ============================================================
// COMPONENT: MovieList.js
// CONCEPTS USED:
//   - useEffect: simulate fetching movie data (sets movies in state)
//   - useState: store movie list locally
//   - State Lifting: receives onBookingAdded callback from parent (App.js)
//   - Conditional Rendering: show loading state
// ============================================================

import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

// Static movie data (simulates an API response)
const MOVIES_DATA = [
  {
    id: 1,
    title: "Kalki 2898 AD",
    genre: "Sci-Fi",
    language: "Telugu",
    duration: "3h 1m",
    rating: "8.4",
    price: 250,
    poster: "🚀",
    description: "A futuristic sci-fi epic blending mythology with technology in 2898 AD.",
  },
  {
    id: 2,
    title: "Stree 2",
    genre: "Horror-Comedy",
    language: "Hindi",
    duration: "2h 15m",
    rating: "8.8",
    price: 200,
    poster: "👻",
    description: "The legendary Stree returns to haunt Chanderi once again!",
  },
  {
    id: 3,
    title: "Pushpa 2",
    genre: "Action",
    language: "Telugu",
    duration: "3h 20m",
    rating: "7.9",
    price: 300,
    poster: "🔥",
    description: "Pushpa Raj returns stronger and more defiant than ever.",
  },
  {
    id: 4,
    title: "Devara",
    genre: "Thriller",
    language: "Telugu",
    duration: "2h 50m",
    rating: "7.5",
    price: 220,
    poster: "🌊",
    description: "A fearless man and his legacy of power on the high seas.",
  },
  {
    id: 5,
    title: "Vettaiyan",
    genre: "Action",
    language: "Tamil",
    duration: "2h 30m",
    rating: "7.2",
    price: 180,
    poster: "🦅",
    description: "A veteran cop takes on a dangerous mission to protect the innocent.",
  },
  {
    id: 6,
    title: "Singham Again",
    genre: "Action",
    language: "Hindi",
    duration: "2h 40m",
    rating: "6.8",
    price: 190,
    poster: "🦁",
    description: "The fearless cop is back in an all-out action blockbuster.",
  },
];

const MovieList = () => {
  // useState: local state for movies and loading
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // useEffect: simulate an API call to fetch movies
  // This runs once when the component mounts (empty dependency array [])
  useEffect(() => {
    console.log("useEffect: Simulating movie data fetch...");

    // Simulate network delay with setTimeout
    const timer = setTimeout(() => {
      setMovies(MOVIES_DATA);
      setLoading(false);
      console.log("useEffect: Movies loaded!", MOVIES_DATA.length, "movies");
    }, 1000);

    // Cleanup function: cancels timer if component unmounts early
    return () => clearTimeout(timer);
  }, []); // Empty array = run only once on mount

  // Derive unique genres for filter buttons
  const genres = ["All", ...new Set(MOVIES_DATA.map((m) => m.genre))];

  // Filter movies based on search and genre
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  // Conditional Rendering: show spinner while loading
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🎬</div>
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <section className="movie-list-section">
      <div className="section-header">
        <h2 className="section-title">🎥 Now Showing</h2>
        <p className="section-subtitle">{movies.length} movies available</p>
      </div>

      {/* Search and Filter Controls - Event Handling */}
      <div className="filter-controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Event Handling
        />
        <div className="genre-filters">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`genre-btn ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => setSelectedGenre(genre)} // Event Handling
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Rendering: no results found */}
      {filteredMovies.length === 0 ? (
        <div className="no-results">
          <p>😕 No movies found for "{searchQuery}"</p>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            // MovieCard receives movie as prop — props passing
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieList;
