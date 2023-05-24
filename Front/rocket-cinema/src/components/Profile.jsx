import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";

const API_SESSION_STORAGE = sessionStorage.getItem("accessToken");
const LOGGED_USERNAME = sessionStorage.getItem("username");

const showDate = format(new Date(), "dd/MM/yyyy");

export default function Profile() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/tickets?id=1`, {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + API_SESSION_STORAGE,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="ProfileContainer">
      <h2>Welcome back, {LOGGED_USERNAME}</h2>
      <h3>Ticket Summary</h3>
      {tickets.length > 0 ? (
        <ul className="TicketList">
          {tickets.map((ticket, index) => (
            <li key={index}>
              <p>Movie: {ticket.movieName}</p>
              <p>Theater: {ticket.theaterName}</p>
              <p>Showtime: {ticket.selectedShowtime}</p>
              <p>Show date: {showDate}</p>
              <p>Seat No: {ticket.seatNo}</p>
              <p>Ticket Amount: {ticket.ticketAmount}€</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  );
}
