import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../style/Navbar.css";

function TopNavbar() {
  const loggedUser = useSelector((state) => state.auth.user);
  const loggedUsername = sessionStorage.getItem("username");
  const loggedName = sessionStorage.getItem("name");
  const loggedEmail = sessionStorage.getItem("email");

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
            <NavDropdown title={<span className="profile-title">{`My profile (${loggedUsername})`}</span>} id="basic-nav-dropdown" menuVariant="dark">
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
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
    </Navbar>
  );
}

export default TopNavbar;
