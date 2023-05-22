import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const API_KEY = process.env.REACT_APP_API_KEY_BEARER;

const BookMovie = () => {
  const selectedMovieId = useSelector((state) => state.movie.selectedMovie.movieId);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovieId}`, {
          headers: {
            accept: "application/json",
            Authorization: API_KEY,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          setMovieDetails(data);
        } else {
          throw new Error("Error fetching movie details");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [selectedMovieId]);

  return (
    <div>
      {movieDetails ? (
        <>
          <h1>{movieDetails.original_title}</h1>
          <img src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.original_title} />
          <p>{movieDetails.overview}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookMovie;
