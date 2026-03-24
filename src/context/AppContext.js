// ============================================================
// REACT CONCEPT: useContext
// This file creates two Contexts:
//   1. ThemeContext - toggles dark/light mode across all components
//   2. UserContext  - tracks if user is "logged in"
// Any component can consume these without prop drilling!
// ============================================================

import React, { createContext, useState, useContext } from "react";

// ---------- Theme Context ----------
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // useState: local state for theme
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook so components don't need to import ThemeContext directly
export const useTheme = () => useContext(ThemeContext);

// ---------- User Context ----------
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // useState: track login status
  const [user, setUser] = useState(null); // null means not logged in

  const login = (name) => setUser({ name });
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
