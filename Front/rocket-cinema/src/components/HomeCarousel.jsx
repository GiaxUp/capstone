import Carousel from "react-bootstrap/Carousel";
import "../style/HomeCarousel.css";

function HomeCarousel() {
  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Carousel>
        <Carousel.Item interval={5000}>
          <img src="images/Car0.jpg" alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={4500}>
          <img src="images/Car7.jpg" alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={4500}>
          <img src="images/Car6.jpg" alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item interval={4500}>
          <img src="images/Car5.jpg" alt="Fourth slide" />
        </Carousel.Item>
        <Carousel.Item interval={4500}>
          <img src="images/Car1.jpg" alt="Second slide" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
