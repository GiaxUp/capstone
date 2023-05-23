import "../style/BookSeats.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSeats, confirmSeats } from "../redux/actions/movieActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY_BEARER;

export default function BookSeats() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutStore = useSelector((state) => state.checkout);
  const API_SESSION_STORAGE = sessionStorage.getItem("accessToken");
  const LOGGED_USERNAME = sessionStorage.getItem("username");

  const selectedMovieStore = useSelector((state) => checkoutStore.selectedMovie);
  const selectedTheater = useSelector((state) => checkoutStore.selectedTheater);
  const selectedShowTime = useSelector((state) => checkoutStore.selectedShowTime);
  const selectedShow = useSelector((state) => checkoutStore.selectedShow);
  const requestedSeats = useSelector((state) => checkoutStore.requestedSeats);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatName) => {
    if (selectedSeats.includes(seatName)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatName));
    } else {
      setSelectedSeats([...selectedSeats, seatName]);
    }
  };

  const handleConfirmSeats = async () => {
    dispatch(selectSeats(selectedSeats));

    const ticketData = {
      requestedSeats: selectedSeats,
      showId: selectedShow,
      requestedShowtime: selectedShowTime,
      userId: 1, // For now hardcoded, I'm lazy :)
    };

    try {
      const response = await axios.post("http://localhost:8080/ticket/book", ticketData, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + API_SESSION_STORAGE,
        },
      });
      console.log(response.data);
      alert("Pagamento effettuato!");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalCost = () => {
    const premiumSeatPrice = 20;
    const classicSeatPrice = 10;
    let totalCost = 0;

    selectedSeats.forEach((seat) => {
      if (seat.charAt(0) === "A") {
        totalCost += premiumSeatPrice;
      } else {
        totalCost += classicSeatPrice;
      }
    });

    return totalCost;
  };

  const renderSeat = (seatName) => {
    const isSelected = selectedSeats.includes(seatName);
    const isPremiumRow = seatName[0] === "A";

    return (
      <div key={seatName} className={`seat ${isSelected ? "selected" : ""} ${isPremiumRow ? "premium" : ""}`} onClick={() => handleSeatClick(seatName)}>
        {seatName}
      </div>
    );
  };

  const renderSeatsMap = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const seatsPerRow = 8;

    return rows.map((row) => (
      <div key={row} className="seat-row">
        {Array.from({ length: seatsPerRow }, (_, index) => renderSeat(`${row}${index + 1}`))}
      </div>
    ));
  };

  return (
    <>
      <div className="CheckoutSummary">
        <h2>Riepilogo Checkout</h2>
        <p>Selected Movie: {selectedMovieStore.movieName}</p>
        <p>Selected Theater: {selectedTheater}</p>
        <p>Selected Show Time: {selectedShowTime}</p>
        <p>Selected Show: {selectedShow}</p>
      </div>

      <div className="SeatMap">
        <h3>Seleziona i posti</h3>
        <div className="seats-container">{renderSeatsMap()}</div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="CheckoutContainer">
          <h3>Checkout</h3>
          <p>Total cost of your selected seats: {calculateTotalCost()}€</p>
          <button onClick={handleConfirmSeats}>Conferma posti</button>
        </div>
      )}
    </>
  );
}
