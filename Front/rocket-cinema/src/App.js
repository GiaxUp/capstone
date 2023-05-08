import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
