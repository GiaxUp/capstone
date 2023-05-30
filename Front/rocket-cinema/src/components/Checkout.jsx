import "../style/BookSeats.css";
import { Container, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TopNavbar from "./TopNavbar";
import { selectSeats, confirmSeats } from "../redux/actions/movieActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

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
  const [showAlert, setShowAlert] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (selectedShow) {
      fetchBookedSeats();
    }
  }, [selectedShow]);

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/ticket/show/${selectedShow}`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + API_SESSION_STORAGE,
        },
      });

      let bookedSeats = [];

      if (response.data.length > 0) {
        response.data.forEach((booking) => {
          const { allocatedSeats } = booking;
          if (allocatedSeats) {
            const seats = allocatedSeats.split(",").map((seat) => seat.trim());
            bookedSeats = [...bookedSeats, ...seats];
          }
        });

        setBookedSeats(bookedSeats);
        console.log(bookedSeats);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      await axios.post("http://localhost:8080/ticket/book", ticketData, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + API_SESSION_STORAGE,
        },
      });

      setShowAlert(true); // Mostra l'alert
      setTimeout(() => {
        setShowAlert(false); // Nasconde l'alert dopo 5 secondi
        navigate("/home"); // Esegue il redirect dopo 5 secondi
      }, 5000);
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
    const isBooked = bookedSeats.includes(seatName);

    return (
      <div
        key={seatName}
        className={`seat ${isSelected ? "selected" : ""} ${isPremiumRow ? "premium" : ""} ${isBooked ? "booked" : ""}`}
        onClick={() => handleSeatClick(seatName)}>
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

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      <TopNavbar />
      <div className="checkout-container">
        <Container className="d-flex flex-column align-items-center justify-content-center maincontainer">
          <div className="CheckoutSummary d-flex flex-column align-items-center justify-content-center ">
            <h2>Selected options</h2>
            <p>
              Movie: {selectedMovieStore.movieName} | Theater: {selectedTheater} | Show Number: {selectedShow} | Show Time: {selectedShowTime}
            </p>
          </div>

          <div className="SeatMap d-flex flex-column align-items-center justify-content-center ">
            <h2>Select your seats</h2>
            <p>
              Price for a Premium seat (row A): 20€ <br />
              Price for a Classic seat (rows B - H): 10€
            </p>

            <div className="seats-container">{renderSeatsMap()}</div>
          </div>

          {selectedSeats.length > 0 && (
            <div className="CheckoutContainer d-flex flex-column align-items-center justify-content-center mt-3">
              <h2>Checkout</h2>
              <p>Total cost of your selected seats: {calculateTotalCost()}€</p>
              <Button variant="success" onClick={handleConfirmSeats}>
                Confirm and pay!
              </Button>
            </div>
          )}
        </Container>
      </div>
      <Snackbar open={showAlert} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Alert icon={false} onClose={handleAlertClose} variant="filled" severity="success">
          Payment accepted!
        </Alert>
      </Snackbar>
    </>
  );
}
