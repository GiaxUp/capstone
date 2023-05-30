import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../style/Navbar.css";
import Logout from "../components/Logout.jsx";

function TopNavbar() {
  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUsername = sessionStorage.getItem("username");
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    setShowLogout(true);
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="images/logoNav.png" alt="logonav" className="logonav" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/home" style={{ color: "white", fontWeight: "bold" }}>
              Home
            </Nav.Link>
            <Nav.Link href="/promotions" style={{ color: "white", fontWeight: "bold" }}>
              Promotions
            </Nav.Link>
            <NavDropdown title={<span className="profile-title">{`My profile (${loggedUsername})`}</span>} id="basic-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search movies..." className="me-2" aria-label="Search" />
            <Button variant="outline-success" style={{ backgroundColor: "#2dce89", borderColor: "#2dce89", color: "white", fontWeight: "bold" }}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      {showLogout && <Logout />}
    </Navbar>
  );
}

export default TopNavbar;
