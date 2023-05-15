import React, { useEffect, useState } from "react";
import "../style/HeadMovies.css";

const API_KEY = process.env.API_KEY_BEARER;

const HeadMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    // const fetchMovies = async () => {
    //   try {
    //     const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);

    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log(data);
    //       setMovies(data.results); // Aggiorna i dati dei film nella variabile di stato movies
    //     } else {
    //       throw new Error("Errore nella richiesta API");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchMovies();
  }, []);

  // Da aggiornare con fetch mie
  return (
    <div>
      {/* <h1>Now in theaters</h1> */}
      <div className="movie-poster-container d-flex justify-content-center">
        {movies.slice(0, 5).map((movie) => (
          <div key={movie.id} className="movie-card">
            {/* <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} /> */}
            <div className="movie-card-overlay">
              <button className="btn btn-secondary">Watch Trailer</button>
              <button className="btn btn-primary">Book Ticket</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeadMovies;
