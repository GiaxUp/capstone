import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/HomeMovies.css";
import HomeCarousel from "./HomeCarousel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { saveSelectedMovie } from "../redux/actions/movieActions";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

const API_KEY = process.env.REACT_APP_API_KEY_BEARER;

const HomeMovies = () => {
  const [movies, setMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const API_SESSION_STORAGE = sessionStorage.getItem("accessToken");
  const LOGGED_USERNAME = sessionStorage.getItem("username");
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  // Open/close trailer video
  const openVideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  // Stuff for the "Turn off lights" effetct around trailers
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 9999,
  };

  const videoContainerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10000,
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "20px",
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
          headers: {
            accept: "application/json",
            Authorization: API_KEY,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setMovies(data.results);
          const results = data.results;

          const formattedMovies = results.slice(0, 5).map((movie) => {
            return {
              id: movie.id,
              duration: Math.floor(Math.random() * (200 - 90 + 1)) + 90,
              movieName: movie.original_title,
              releaseDate: movie.release_date,
            };
          });
          console.log(formattedMovies);
          setMovies(results.slice(0, 5));
          setOtherMovies(results.slice(5));
          setCurrentMovies(formattedMovies);

          formattedMovies.forEach(async (movie) => {
            try {
              await axios.post("http://localhost:8080/movie/add", movie, {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + API_SESSION_STORAGE,
                },
              });
              console.log("Film salvati nel database BE!");
            } catch (error) {
              console.log(error);
            }
          });
        } else {
          throw new Error("Errore nella richiesta API");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  const chunk = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  };

  const dispatch = useDispatch();
  const checkoutStore = useSelector((state) => state.checkout);
  const handleBookTicket = (movieName, movieId) => {
    dispatch(saveSelectedMovie(movieName, movieId));
    navigate("/bookmovie");
  };

  const MovieRow = ({ movies }) => (
    <div className="movie-row">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <div className="movie-card-overlay">
            <button className="btn btn-secondary" onClick={openVideo}>
              Watch Trailer
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <HomeCarousel />
      <div>
        <div>
          <p className="main-titles">Now in theaters</p>
          <div className="movie-poster-container d-flex justify-content-center">
            {showVideo && (
              <div style={overlayStyle} onClick={closeVideo}>
                <div style={videoContainerStyle}>
                  <YouTube videoId="tRotw_IpuaQ" />
                  <span style={closeBtnStyle} onClick={closeVideo}>
                    X
                  </span>
                </div>
              </div>
            )}
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <div className="movie-card-overlay">
                  <button className="btn btn-secondary" onClick={openVideo}>
                    Watch Trailer
                  </button>
                  <button className="btn btn-primary" onClick={() => handleBookTicket(movie.original_title, movie.id)}>
                    Book Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="main-titles">Coming soon</p>
          <div className="movie-grid">
            {chunk(otherMovies, 5).map((movieChunk, index) => (
              <MovieRow key={index} movies={movieChunk} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMovies;
