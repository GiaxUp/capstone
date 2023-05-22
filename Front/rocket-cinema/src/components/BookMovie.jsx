import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/BookMovie.css";
import TopNavbar from "./TopNavbar";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTheater, setSelectedShowTime } from "../redux/actions/movieActions";

const BookMovie = () => {
  const selectedMovieId = useSelector((state) => state.movie.selectedMovie.movieId);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const [expandedComments, setExpandedComments] = useState([]);

  const handleExpandComment = (commentId) => {
    setExpandedComments((prevExpandedComments) => [...prevExpandedComments, commentId]);
  };

  const isCommentExpanded = (commentId) => {
    return expandedComments.includes(commentId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}`;
    return formattedDate;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovieId}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhZDUxNzc0NGM0M2FlNDQ0NGM3N2E0ZTEyZDZmMCIsInN1YiI6IjY0NWQ0ZWZkM2ZlMTYwMDEzODY4OGQxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bu57jDjkEK9IMlZFMUkHR0QTV511AGhGQZXKP8J6vro",
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

    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovieId}/reviews?language=en-US&page=1`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhZDUxNzc0NGM0M2FlNDQ0NGM3N2E0ZTEyZDZmMCIsInN1YiI6IjY0NWQ0ZWZkM2ZlMTYwMDEzODY4OGQxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bu57jDjkEK9IMlZFMUkHR0QTV511AGhGQZXKP8J6vro",
          },
        });

        if (response.status === 200) {
          const data = response.data.results;
          setMovieReviews(data.slice(0, 3));
        } else {
          throw new Error("Error fetching movie reviews");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
    fetchMovieReviews();
  }, [selectedMovieId]);

  return (
    <>
      <TopNavbar />
      <div className="container-movie">
        {movieDetails ? (
          <>
            <h1 className="title">{movieDetails.original_title}</h1>
            <img className="poster" src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`} alt={movieDetails.original_title} />
            <h3 className="comments-title">Description</h3>
            <p className="overview">{movieDetails.overview}</p>

            <h3 className="comments-title">General informations</h3>
            <p className="details">Release date: {movieDetails.release_date}</p>
            <p className="details">
              Runtime: {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m
            </p>
            <p className="details">Average vote: {movieDetails.vote_average}</p>
            <p className="details">Number of votes: {movieDetails.vote_count}</p>

            {movieReviews.length > 0 ? (
              <>
                <h3 className="comments-title">Best comments about this movie</h3>
                {movieReviews.map((review) => (
                  <p className="comment" key={review.id}>
                    <span className="author">{<strong>{review.author}</strong>}</span> on{" "}
                    <span>{<span className="date">{formatDate(review.created_at)}</span>}</span> commented: "
                    {isCommentExpanded(review.id) ? review.content : review.content.slice(0, 350) + "... "}
                    {review.content.length > 350 && !isCommentExpanded(review.id) && (
                      <button className="show-more-button" onClick={() => handleExpandComment(review.id)}>
                        Show more
                      </button>
                    )}
                  </p>
                ))}
              </>
            ) : (
              <p className="no-comments">No comments available.</p>
            )}

            <p className="comments-title">Book your show now</p>
            <select className="select-theater">
              <option value="">Select Theater</option>
            </select>

            <select className="select-show-time">
              <option value="">Select Show Time</option>
            </select>
            <button className="confirm-button">Confirm</button>
          </>
        ) : (
          <p className="loading">Loading movie details...</p>
        )}
      </div>
    </>
  );
};

export default BookMovie;
