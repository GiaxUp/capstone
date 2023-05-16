import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import Checkout from "./components/Checkout.jsx";
import Home from "../src/components/Home.jsx";
import AnimatedBackground from "../src/components/AnimatedBackground.jsx";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
      <AnimatedBackground />
    </Provider>
  );
}

export default App;
