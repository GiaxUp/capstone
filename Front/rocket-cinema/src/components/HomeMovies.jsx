import React, { useEffect, useState } from "react";
import "../style/HomeMovies.css";

const API_KEY = process.env.API_KEY_BEARER;
const API_KEY_LOGGED = sessionStorage.getItem("accessToken");

const HomeMovies = () => {
  const [movies, setMovies] = useState([]);
  const [otherMovies, setOtherMovies] = useState([]);
  const [currentMovies, setCurrentMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: API_KEY,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setMovies(data.results); // Aggiorna i dati dei film nella variabile di stato movies
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
              await fetch("http://localhost:8080/movie/add", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + API_KEY_LOGGED,
                },
                body: JSON.stringify(movie),
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

  const MovieRow = ({ movies }) => (
    <div className="movie-row">
      {movies.map((movie) => (
        <div key={movie.id} className="movie-card">
          <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
          <div className="movie-card-overlay">
            <button className="btn btn-secondary">Watch Trailer</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div>
        <h1>Film del momento</h1>
        <div className="movie-poster-container d-flex justify-content-center">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <div className="movie-card-overlay">
                <button className="btn btn-secondary">Watch Trailer</button>
                <button className="btn btn-primary">Book Ticket</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Non più in proiezione</h1>
        <div className="movie-grid">
          {chunk(otherMovies, 5).map((movieChunk, index) => (
            <MovieRow key={index} movies={movieChunk} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMovies;
