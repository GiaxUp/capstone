import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/HomeMovies.css";
import HomeCarousel from "./HomeCarousel.jsx";
import { useDispatch, useSelector } from "react-redux";
import { saveSelectedMovie } from "../redux/actions/movieActions";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";

const HomeMovies = () => {
  const [movies, setMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);
  const API_SESSION_STORAGE = sessionStorage.getItem("accessToken");
  const LOGGED_USERNAME = sessionStorage.getItem("username");
  const [showVideo, setShowVideo] = useState(false);
  const [videos, setVideos] = useState([]); // Need this for the trailers
  const navigate = useNavigate();

  // Fetch to get trailers for the clicked movie
  const handleWatchTrailer = async (movieName, movieId) => {
    dispatch(saveSelectedMovie(movieName, movieId));
    setShowVideo(true);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhZDUxNzc0NGM0M2FlNDQ0NGM3N2E0ZTEyZDZmMCIsInN1YiI6IjY0NWQ0ZWZkM2ZlMTYwMDEzODY4OGQxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bu57jDjkEK9IMlZFMUkHR0QTV511AGhGQZXKP8J6vro",
        },
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setVideos(data.results);
      } else {
        throw new Error("Errore nella richiesta API");
      }
    } catch (error) {
      console.log(error);
    }
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
    backgroundColor: "rgba(0, 0, 0, 0.95)",
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhZDUxNzc0NGM0M2FlNDQ0NGM3N2E0ZTEyZDZmMCIsInN1YiI6IjY0NWQ0ZWZkM2ZlMTYwMDEzODY4OGQxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bu57jDjkEK9IMlZFMUkHR0QTV511AGhGQZXKP8J6vro",
          },
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setMovies(data.results);
          const results = data.results;

          // Pushing the sliced movies from TMBD API to my database, in order to manage the tickets later
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

  // Saving the Movie name and ID in the Redux Store
  const dispatch = useDispatch();
  const checkoutStore = useSelector((state) => state.checkout);
  const handleBookTicket = (movieName, movieId) => {
    dispatch(saveSelectedMovie(movieName, movieId));
    navigate("/bookmovie");
  };

  // This will show the "Coming soon" movies separated from the "Now in theaters" movies in the section below
  const MovieRow = ({ movies }) => (
    <div className="movie-row">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <div className="movie-card-overlay">
            <button className="btn btn-secondary" onClick={() => handleWatchTrailer(movie.original_title, movie.id)}>
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
                  {videos.length > 0 && <YouTube videoId={videos.find((video) => video.name.includes("Official Trailer")).key} />}
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
                  <button className="btn btn-secondary" onClick={() => handleWatchTrailer(movie.original_title, movie.id)}>
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
