// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FilmCarousel = () => {
//   const [movies, setMovies] = useState([]);
//   const API_KEY = process.env.REACT_APP_API_KEY;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
//           params: {
//             api_key: API_KEY,
//           },
//         });
//         setMovies(response.data.results);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchMovies();
//   }, []);

//   return (

//       // Carosello da capire come fare

//   );
// };

// export default FilmCarousel;
