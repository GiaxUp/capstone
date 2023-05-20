import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const API_KEY = process.env.REACT_APP_API_KEY_BEARER;
const API_KEY_LOGGED = sessionStorage.getItem("accessToken");

const BookMovie = () => {
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const fetchTrailer = async () => {
      try {
        const response = await fetch("https://api.themoviedb.org/3/movie/385687/videos?language=en-US", options);
        const data = await response.json();
        const trailers = data.results.filter((result) => result.type === "Trailer");
        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          setTrailerKey(trailerKey);
        } else {
          console.log("Nessun trailer disponibile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrailer();
  }, []);

  class Video extends React.Component {
    _onReady(event) {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    }

    render() {
      const opts = {
        height: "390",
        width: "640",
        playerVars: {
          autoplay: 1,
        },
      };

      return <YouTube videoId={this.props.trailerKey} opts={opts} onReady={this._onReady} />;
    }
  }
};

export default BookMovie;
