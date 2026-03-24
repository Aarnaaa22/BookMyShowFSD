// ============================================================
// COMPONENT: Header.js
// CONCEPTS USED:
//   - useContext (ThemeContext, UserContext)
//   - Conditional Rendering (show Login/Logout button)
//   - Event Handling (toggle theme, login/logout)
//   - React Router (NavLink for navigation)
// ============================================================

import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme, useUser } from "../context/AppContext";
import { useSelector } from "react-redux";

const Header = () => {
  // useContext: access theme and user from context
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useUser();

  // useSelector: read cart item count from Redux store
  const cartCount = useSelector((state) => state.bookings.items.length);

  // Event handler: quick demo login
  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      login("MovieFan"); // simulate login with a fixed name
    }
  };

  return (
    <header className={`header ${theme}`}>
      <div className="header-brand">
        <span className="brand-icon">🎬</span>
        <h1 className="brand-name">BookMyShow <span className="brand-tag">Clone</span></h1>
      </div>

      {/* React Router NavLink for navigation */}
      <nav className="header-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🏠 Home
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          🎟️ Cart
          {/* Conditional Rendering: show badge only if cart has items */}
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          👤 Profile
        </NavLink>
      </nav>

      <div className="header-actions">
        {/* Conditional Rendering: show user name if logged in */}
        {user && <span className="welcome-msg">Hi, {user.name}!</span>}

        {/* Event Handling: login/logout button */}
        <button className="btn-auth" onClick={handleAuth}>
          {user ? "Logout" : "Login"}
        </button>

        {/* Event Handling: theme toggle */}
        <button className="btn-theme" onClick={toggleTheme} title="Toggle Theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
