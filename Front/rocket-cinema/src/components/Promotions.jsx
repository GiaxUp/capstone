import React from "react";
import "../style/Promotions.css";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

const Promotions = () => {
  return (
    <>
      <TopNavbar />
      <div className="promotions-container">
        <img src="images/Car0.jpg" alt="First" className="promotions-image" />
        <img src="images/Car2.jpg" alt="Third" className="promotions-image" />
        <img src="images/Car3.jpg" alt="Fourth" className="promotions-image" />
        <img src="images/Car4.png" alt="Fifth" className="promotions-image" />
      </div>
      <Footer />
    </>
  );
};

export default Promotions;
