import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import "../style/Profile.css";
import TopNavbar from "./TopNavbar";
import Footer from "./Footer";

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";

// IMPORTANT! This section will be hardcoded with my socials stuff and infos,
// just because I need to present this project in a live call!

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
      <section>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4" style={{ backgroundColor: "#B2A4FF" }}>
                <MDBCardBody className="text-center">
                  <MDBCardImage src="https://i.ibb.co/FYg1ZTZ/Giax-Cheer.png" alt="avatar" className="rounded-circle" style={{ width: "150px" }} fluid />
                  <p className="text-dark mb-1 mt-3 fw-bold">Full Stack Web Developer</p>
                  <p className="text-dark mb-4 fw-bold">Santa Fiora (Grosseto), Toscana</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <MDBBtn className="ms-1">Message</MDBBtn>
                  </div>
                  <div className="d-flex justify-content-center mb-2 mt-5">
                    <MDBBtn href="https://github.com/GiaxUp/" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: "#161b22" }}>
                      GitHub
                    </MDBBtn>
                    <MDBBtn
                      href="https://www.linkedin.com/in/giacomo-della-peruta/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ms-1"
                      style={{ backgroundColor: "#0077B5" }}>
                      LinkedIn
                    </MDBBtn>
                    <MDBBtn href="https://t.me/Giacs" target="_blank" rel="noopener noreferrer" className="ms-1" style={{ backgroundColor: "#26A5E4" }}>
                      Telegram
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-0"></MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4" style={{ backgroundColor: "#FFDEB4" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText className="text-dark fw-bold">Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-dark">Giacomo Della Peruta</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText className="text-dark fw-bold">Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-dark">giaxup@live.it</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText className="text-dark fw-bold">Username</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-dark">{LOGGED_USERNAME}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>

              <MDBRow>
                {tickets.map((ticket, index) => (
                  <MDBCol md="6" key={index}>
                    <MDBCard className="mb-4 ticket-card" style={{ backgroundColor: "#FEFAE0", color: "#BB6464" }}>
                      <MDBCardBody>
                        <div>
                          <MDBCardText className="fw-bold">{ticket.movieName}</MDBCardText>
                          <MDBCardText>Theater: {ticket.theaterName}</MDBCardText>
                          <MDBCardText>Showtime: {ticket.selectedShowtime}</MDBCardText>
                          <MDBCardText>Show date: {showDate}</MDBCardText>
                          <MDBCardText>Seats: {ticket.seatNo}</MDBCardText>
                          <MDBCardText className="fw-bold">Ticket Amount: {ticket.ticketAmount}€</MDBCardText>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
}
