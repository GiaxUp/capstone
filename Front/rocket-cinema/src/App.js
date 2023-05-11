import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./components/Login.jsx";
import Home from "../src/components/Home.jsx";
import AnimatedBackground from "../src/components/AnimatedBackground.jsx";

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <AnimatedBackground />
    </ThemeProvider>
  );
}

export default App;
