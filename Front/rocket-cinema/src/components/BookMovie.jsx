import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/BookMovie.css";
import TopNavbar from "./TopNavbar";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTheater, setSelectedShowTime, setSelectedShowID } from "../redux/actions/movieActions";
import { useNavigate } from "react-router-dom";

const BookMovie = () => {
  const checkoutStore = useSelector((state) => state.checkout);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieReviews, setMovieReviews] = useState([]);
  const [expandedComments, setExpandedComments] = useState([]);
  const [showList, setShowList] = useState([]);
  const [selectedTheater, setSelectedTheaterState] = useState("");
  const [selectedShowTime, setSelectedShowTimeState] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const retriveShowID = () => {
    const showFound = showList.find((show) => show.theaterID === Number(checkoutStore.selectedTheater));
    dispatch(setSelectedShowID(showFound?.showID));
  };

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
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${checkoutStore?.selectedMovie.movieId}`, {
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
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${checkoutStore?.selectedMovie.movieId}/reviews?language=en-US&page=1`, {
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
  }, [checkoutStore?.selectedMovie.movieId]);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/show/getShows?id=${checkoutStore?.selectedMovie.movieId}`, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhYWFAYWFhLml0IiwiaWF0IjoxNjg0ODM0MDU5LCJleHAiOjE2ODU0Mzg4NTl9.H1PdbDVfi3Ffm4v-_yR01pHYdpWZQRuONsnPshmi-XmQ5H8rngX26smB3YGihKDo",
          },
        });
        if (response.status === 200) {
          const data = response.data;
          setShowList(data);
          console.log(data);
        } else {
          throw new Error("Error fetching show data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowData();
  }, [checkoutStore?.selectedMovie.movieId]);

  const handleTheaterSelection = (event) => {
    const selectedTheater = event.target.value;
    setSelectedTheater(selectedTheater);
    const selectedShowTime = movieDetails.shows.find((show) => show.theaterID === selectedTheater).showTime;
    setSelectedShowTime(selectedShowTime);
  };

  const handleShowTimeSelection = (event) => {
    const selectedShowTime = event.target.value;
    setSelectedShowTime(selectedShowTime);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    retriveShowID();
  }, [checkoutStore.selectedTheater]);

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
            {/* const showFound = showList.find((show) => show.theaterID === Number(checkoutStore.selectedTheater)); dispatch(setSelectedShowID(showFound?.showID)); */}
            <p className="comments-title">Book your show now</p>
            {showList.length > 0 && (
              <select
                className="select-theater"
                value={selectedTheater}
                onChange={(e) => {
                  const convertedTheater = parseInt(e.target.value.charAt(e.target.value.length - 1));
                  dispatch(setSelectedTheater(convertedTheater));
                }}>
                <option value="">Select Theater</option>
                {showList.map((show, index) => (
                  <option key={show.theaterID} defaultValue={show.theaterID}>{`Theater ${show.theaterID}`}</option>
                ))}
              </select>
            )}
            <select className="select-show-time" value={selectedShowTime} onChange={(e) => dispatch(setSelectedShowTime(e.target.value))}>
              <option value="">Select Show Time</option>

              {showList.length > 0 &&
                showList[1].showTime.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
            </select>
            <button className="confirm-button" onClick={handleCheckout}>
              Checkout
            </button>
          </>
        ) : (
          <p className="loading">Loading movie details...</p>
        )}
      </div>
    </>
  );
};

export default BookMovie;
