import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";

function TopNavbar() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="https://i.ibb.co/3sn8nYJ/logo.png" alt="logo" border="0" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/" style={{ color: "white", fontWeight: "bold" }}>
              Home
            </Nav.Link>
            <Nav.Link href="#action3" style={{ color: "white", fontWeight: "bold" }}>
              Promotions
            </Nav.Link>
            <Nav.Link href="#action2" style={{ color: "white", fontWeight: "bold" }}>
              Checkout
            </Nav.Link>
            <Nav.Link href="#action4" style={{ color: "white", fontWeight: "bold" }}>
              Profile
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success" style={{ backgroundColor: "#2dce89", borderColor: "#2dce89", color: "white", fontWeight: "bold" }}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
