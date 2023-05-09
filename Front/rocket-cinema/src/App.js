import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login.jsx";
import Home from "../src/components/Home.jsx";
import AnimatedBackground from "../src/components/AnimatedBackground.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {/* <img src="https://i.ibb.co/0CN9nWR/rocket-1f680.gif" alt="rocket"></img> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/buytickets" element={<BuyTickets />} /> */}
        {/* <Route path="/checkout" element={<Checkout />} /> */}
      </Routes>
      {/* <Footer /> */}
      <AnimatedBackground />
    </BrowserRouter>
  );
}

export default App;
