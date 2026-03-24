// ============================================================
// ROOT COMPONENT: App.js
// CONCEPTS DEMONSTRATED:
//   1. State Lifting      - totalSaved state managed here, passed to children
//   2. React Router       - HashRouter, Routes, Route setup (GitHub Pages safe)
//   3. Context Providers  - ThemeProvider and UserProvider wrap entire app
//   4. useState           - local state for totalSaved (amount spent on bookings)
//   5. useEffect          - logs theme changes to console
//   6. useContext         - useTheme() to apply theme class to app container
// ============================================================

import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
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
  const [totalSaved, setTotalSaved] = useState(0);

  // Callback passed to Cart — child updates parent state
  const handleBookingConfirmed = (amount) => {
    setTotalSaved((prev) => prev + amount);
  };

  // useEffect: runs when theme changes
  useEffect(() => {
    console.log(`Theme changed to: ${theme}`);
    document.body.className = theme; // Apply theme globally
  }, [theme]);

  return (
    <div className={`app-container ${theme}`}>
      {/* Header visible on all pages */}
      <Header />

      {/* ---- ROUTING ---- */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home totalSaved={totalSaved} />} />

        {/* Cart Page */}
        <Route
          path="/cart"
          element={<Cart onBookingConfirmed={handleBookingConfirmed} />}
        />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Fallback Route */}
        <Route path="*" element={<Home totalSaved={totalSaved} />} />
      </Routes>
    </div>
  );
};

// ---- Main App Component ----
function App() {
  return (
    // Redux Global State
    <Provider store={store}>
      {/* Context Providers */}
      <ThemeProvider>
        <UserProvider>
          <HashRouter>
            <AppContent />
          </HashRouter>
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
