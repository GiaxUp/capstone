export const SAVE_SELECTED_MOVIE = "SAVE_SELECTED_MOVIE";

export const saveSelectedMovie = (movieName, movieId) => {
  return {
    type: SAVE_SELECTED_MOVIE,
    payload: {
      movieName,
      movieId,
    },
  };
};
