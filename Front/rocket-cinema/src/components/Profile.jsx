import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "date-fns";
import "../style/Profile.css";
import TopNavbar from "./TopNavbar";

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
    <>
      <TopNavbar />
      <div className="ProfileContainer">
        <h2>Welcome back, {LOGGED_USERNAME}</h2>
        <h3>Ticket Summary</h3>
        {tickets.length > 0 ? (
          <ul className="TicketList">
            {tickets.map((ticket, index) => (
              <div key={index} className="Ticket">
                <div className="ticket-container">
                  <div className="ticket-info">
                    <div className="title-line">{ticket.movieName}</div>
                    <div className="theater-line">Theater: {ticket.theaterName}</div>
                    <div className="showtime-line">Showtime: {ticket.selectedShowtime}</div>
                    <div className="showdate-line">Show date: {showDate}</div>
                  </div>
                  <div className="ticket-details">
                    <div className="seatNo-line">Seats: {ticket.seatNo}</div>
                    <div className="ticketAmount-line">Ticket Amount: {ticket.ticketAmount}€</div>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
    </>
  );
}
