import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://www.omdbapi.com/?i=tt3896198&apikey=51c3bbba");
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
  };

  const handleSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        <button className="carousel-button" onClick={handlePrev}>
          &lt;
        </button>
        <div className="carousel-items">
          {movies.length > 0 &&
            movies.map((movie, index) => (
              <div key={index} className={`carousel-item ${index === currentIndex ? "active" : ""}`} onClick={() => handleSlide(index)}>
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            ))}
        </div>
        <button className="carousel-button" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
