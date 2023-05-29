import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <section className="mt-5">
        <Container className="text-center text-md-start">
          <Row className="mt-3 text-center">
            <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Rocket Cinema</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
              <p>Where silver screens ignite with celestial movies, launching your imagination on a captivating voyage beyond the stars!</p>
            </Col>
            <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Social</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
              <p>
                <a href="#!" className="text-dark">
                  <i className="fab fa-facebook-f ms-0 me-2"></i> Facebook
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  <i className="fab fa-twitter me-2"></i> Twitter
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  <i className="fab fa-instagram me-2"></i> Instagram
                </a>
              </p>
            </Col>
            <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
              <p>
                <a href="#!" className="text-dark">
                  Your Account
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Promotions
                </a>
              </p>
              <p>
                <a href="#!" className="text-dark">
                  Coming Soon
                </a>
              </p>
            </Col>
            <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }} />
              <p>
                <i className="fas fa-home mr-3"></i> Roma, RM 00042, IT
              </p>
              <p>
                <i className="fas fa-envelope mr-3"></i> info@rocketcinema.com
              </p>
              <p>
                <i className="fas fa-phone mr-3"></i> + 01 23456789
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="text-center p-3">© 2023 Capstone Project by Giacomo Della Peruta</div>
    </Container>
  );
};

export default Footer;
