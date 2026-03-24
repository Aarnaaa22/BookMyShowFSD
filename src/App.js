// ============================================================
// ROOT COMPONENT: App.js
// CONCEPTS DEMONSTRATED:
//   1. State Lifting      - totalSaved state managed here, passed to children
//   2. React Router       - BrowserRouter, Routes, Route setup
//   3. Context Providers  - ThemeProvider and UserProvider wrap entire app
//   4. useState           - local state for totalSaved (amount spent on bookings)
//   5. useEffect          - logs theme changes to console
//   6. useContext         - useTheme() to apply theme class to app container
// ============================================================

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider, UserProvider, useTheme } from "./context/AppContext";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";

// Styles
import "./App.css";

// ---- Inner App (needs access to context hooks) ----
const AppContent = () => {
  // useContext: get theme to apply correct CSS class
  const { theme } = useTheme();

  // ---- STATE LIFTING ----
  // totalSaved is managed here in App.js (the common ancestor)
  // and passed DOWN to child components via props.
  // Children (Cart/BookingCart) call the callback to update this state.
  const [totalSaved, setTotalSaved] = useState(0);

  // Callback passed to Cart — called when user confirms booking
  // This is "lifting state up": child notifies parent of an event
  const handleBookingConfirmed = (amount) => {
    setTotalSaved((prev) => prev + amount);
  };

  // useEffect: log whenever theme changes
  useEffect(() => {
    console.log(`useEffect in App.js: Theme changed to "${theme}"`);
    document.body.className = theme; // Apply theme to body
  }, [theme]); // Dependency array: re-runs whenever 'theme' changes

  return (
    // Apply theme class to root container
    <div className={`app-container ${theme}`}>
      {/* Header is shown on ALL pages */}
      <Header />

      {/* ---- REACT ROUTER: Define all page routes ---- */}
      <Routes>
        {/* Home page — receives totalSaved via prop (State Lifting) */}
        <Route path="/" element={<Home totalSaved={totalSaved} />} />

        {/* Cart page — receives callback to lift state up */}
        <Route
          path="/cart"
          element={<Cart onBookingConfirmed={handleBookingConfirmed} />}
        />

        {/* Profile page */}
        <Route path="/profile" element={<Profile />} />

        {/* Catch-all: redirect unknown routes to Home */}
        <Route path="*" element={<Home totalSaved={totalSaved} />} />
      </Routes>
    </div>
  );
};

// ---- Main App component — sets up all Providers ----
function App() {
  return (
    // Redux Provider: makes Redux store available to all components
    <Provider store={store}>
      {/* ThemeProvider: makes theme context available everywhere */}
      <ThemeProvider>
        {/* UserProvider: makes user login context available everywhere */}
        <UserProvider>
          {/* BrowserRouter: enables React Router routing */}
          <Router>
            <AppContent />
          </Router>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
