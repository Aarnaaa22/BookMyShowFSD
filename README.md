<div align="center">

# 🎬 BookMyShow Clone

**A React-based entertainment ticket booking app**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

> Book movie tickets, manage your cart, and explore the latest blockbusters —  
> built to demonstrate core React + Redux concepts for college projects & viva.

<br/>

---

</div>

## 📸 Features at a Glance

| Feature | Description |
|--------|-------------|
| 🎟️ **Ticket Counter** | `[+]` `[−]` buttons on every movie card — increment or decrement tickets |
| 🛒 **Smart Cart** | No duplicates — stores `movie × quantity`, updates total dynamically |
| 🖼️ **Real Posters** | Fetches images from TMDB CDN with emoji fallback on error |
| 🔒 **Auth Guard** | Cart & booking require login via Context API |
| 🌙 **Dark / Light Mode** | Theme toggle powered by `ThemeContext` + `useEffect` |
| 🔍 **Search & Filter** | Live title search + genre filter buttons |
| ✨ **Shimmer Loading** | Animated skeleton cards while `useEffect` loads data |
| 📱 **Responsive** | Mobile-friendly grid layout |

---

## 🧠 React Concepts Demonstrated

<details>
<summary><b>🗃️ Redux (Global State Management)</b></summary>

<br/>

- `configureStore` — combines all slices into one central store
- `createSlice` — auto-generates action creators + reducers
- `Provider` in `App.js` — makes store available to all components
- `useSelector` — reads state: `useSelector(state => state.bookings.items)`
- `useDispatch` — updates state: `dispatch(addBooking({...}))`

```js
// bookingSlice.js — actions available
addBooking       // add movie to cart (or increment if exists)
removeBooking    // remove movie from cart
incrementTicket  // +1 ticket for a movie
decrementTicket  // -1 ticket (removes if reaches 0)
clearCart        // empty the entire cart
saveTotalAmount  // store confirmed booking total
```

</details>

<details>
<summary><b>🪝 Hooks (useState, useEffect, useSelector, useDispatch)</b></summary>

<br/>

| Hook | Where Used | Purpose |
|------|-----------|---------|
| `useState` | `MovieCard`, `BookingCart`, `MovieList` | Local UI state (imgError, loading, bookingSuccess) |
| `useEffect` | `MovieList`, `App.js` | Simulated API fetch; sync theme to `document.body` |
| `useSelector` | `Header`, `MovieCard`, `BookingCart`, `Home` | Read from Redux store |
| `useDispatch` | `MovieCard`, `BookingCart` | Send actions to Redux store |

</details>

<details>
<summary><b>🎭 Conditional Rendering</b></summary>

<br/>

Used throughout with `&&` and ternary `? :` operators:

- `MovieCard` — shows **Book Now** button OR **ticket counter** based on cart state
- `BookingCart` — switches between empty cart / login required / items list / success screen
- `Header` — cart badge only visible when `cartCount > 0`
- `Home` — savings banner shown only after a confirmed booking

</details>

<details>
<summary><b>⬆️ State Lifting</b></summary>

<br/>

`totalSaved` lives in `App.js` (parent) and is passed down to `Home.js` as a prop.  
`handleBookingConfirmed` callback flows **down** to `BookingCart` — when a booking is confirmed, the child calls it to update the parent's state.

```
App.js  (owns totalSaved state)
  └── Home.js  ← receives totalSaved as prop
  └── Cart.js  ← receives onBookingConfirmed callback
        └── BookingCart.js  ← calls onBookingConfirmed(amount)
```

</details>

<details>
<summary><b>🌐 Context API (Theme + User)</b></summary>

<br/>

Two contexts in `AppContext.js` — demonstrates the alternative to Redux for simpler shared state:

- `ThemeContext` — dark/light mode toggle, consumed via `useTheme()`
- `UserContext` — login/logout state, consumed via `useUser()`

No prop drilling needed — any component can access these directly.

</details>

<details>
<summary><b>🔀 React Router v6</b></summary>

<br/>

Uses `HashRouter` (# in URL) for GitHub Pages compatibility.

| Path | Component |
|------|-----------|
| `/` | `Home.js` |
| `/cart` | `Cart.js` |
| `/profile` | `Profile.js` |
| `*` | Redirects to Home |

`NavLink` in `Header` provides active link highlighting automatically.

</details>

---

## 🏗️ Project Structure

```
src/
├── redux/
│   ├── store.js              ← configureStore (central state)
│   └── bookingSlice.js       ← createSlice (actions + reducers)
│
├── components/
│   ├── MovieCard.js          ← ticket counter + useSelector/useDispatch
│   ├── MovieList.js          ← useEffect shimmer + real poster URLs
│   ├── BookingCart.js        ← full cart UI with Redux
│   └── Header.js             ← nav + cart badge + theme toggle
│
├── pages/
│   ├── Home.js               ← hero banner + MovieList
│   ├── Cart.js               ← wraps BookingCart
│   └── Profile.js            ← user info + Redux cart count
│
├── context/
│   └── AppContext.js         ← ThemeContext + UserContext
│
├── App.js                    ← Provider + Router + State Lifting
├── App.css                   ← all styles + ticket counter CSS
└── index.js                  ← ReactDOM.createRoot entry point
```

---

## ⚙️ Redux Data Flow

```
User clicks [+]
     │
     ▼
dispatch(incrementTicket(movieId))
     │
     ▼
bookingSlice reducer runs
     │
     ▼
Redux Store state updates
     │
     ▼
useSelector triggers re-render → UI updates instantly
```

---

## 🚀 Getting Started

```bash
# 1. Navigate into the project
cd BookMyShowFSD-enhanced

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open in browser
# http://localhost:3000
```

> **Note:** All dependencies including `@reduxjs/toolkit` and `react-redux` are already listed in `package.json`. No extra installs needed.

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^9.1.0",
  "@reduxjs/toolkit": "^2.2.1",
  "react-router-dom": "^6.22.3",
  "react-scripts": "5.0.1"
}
```

---

<div align="center">

Made with ❤️ for **Full Stack Development** · React + Redux Toolkit

</div>
