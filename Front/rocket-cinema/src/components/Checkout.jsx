import "../style/BookSeats.css";
import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function BookSeats() {
  // const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const checkoutStore = useSelector((state) => state.checkout);

  const selectedMovieStore = useSelector((state) => checkoutStore.selectedMovie);
  const selectedTheater = useSelector((state) => checkoutStore.selectedTheater);
  const selectedShowTime = useSelector((state) => checkoutStore.selectedShowTime);
  const selectedShow = useSelector((state) => checkoutStore.selectedShow);

  return (
    <>
      <div className="CheckoutSummary">
        <h2>Riepilogo Checkout</h2>
        <p>Selected Movie: {selectedMovieStore.movieName}</p>
        <p>Selected Theater: {selectedTheater}</p>
        <p>Selected Show Time: {selectedShowTime}</p>
        <p>Selected Show: {selectedShow}</p>
      </div>
      <div className="BookSeats">
        <ShowCase />
        <Cinema movie={selectedMovieStore.movieName} selectedSeats={selectedSeats} onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)} />
        <Cinema selectedSeats={selectedSeats} onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)} />

        <p className="info">
          You have selected <span className="count">{selectedSeats.length}</span> seats for the price of {/* da cambiare selectedMovieStore.movieName */}
          <span className="total">{selectedSeats.length * selectedMovieStore.movieName}$</span>
        </p>
      </div>
    </>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>N/A</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied.includes(seat);
          return (
            <span
              tabIndex="0"
              key={seat}
              className={clsx("seat", isSelected && "selected", isOccupied && "occupied")}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
            />
          );
        })}
      </div>
    </div>
  );
}
