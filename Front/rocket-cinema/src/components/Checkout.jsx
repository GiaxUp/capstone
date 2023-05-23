import "../style/BookSeats.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSeats, confirmSeats } from "../redux/actions/movieActions";
import axios from "axios";

export default function BookSeats() {
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state) => state.checkout);

  const selectedMovieStore = useSelector((state) => checkoutStore.selectedMovie);
  const selectedTheater = useSelector((state) => checkoutStore.selectedTheater);
  const selectedShowTime = useSelector((state) => checkoutStore.selectedShowTime);
  const selectedShow = useSelector((state) => checkoutStore.selectedShow);
  const requestedSeats = useSelector((state) => checkoutStore.requestedSeats);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatName) => {
    if (selectedSeats.includes(seatName)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatName));
      console.log(selectedSeats);
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
          Authorization:
            "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYWFAYWFhLml0IiwiaWF0IjoxNjg0ODY2ODkzLCJleHAiOjE2ODU0NzE2OTN9.5Vt5N_rRrMTaJdEmaeoMFVkCsCb5Eo8T2xqtY4JluSxEluAmzI-M-rrzkT-PeIms",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
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
        <button onClick={handleConfirmSeats}>Conferma posti</button>
      </div>
    </>
  );
}
