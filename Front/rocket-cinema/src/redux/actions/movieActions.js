export const SAVE_SELECTED_MOVIE = "SAVE_SELECTED_MOVIE";
export const SET_SELECTED_THEATER = "SET_SELECTED_THEATER";
export const SET_SELECTED_SHOW_TIME = "SET_SELECTED_SHOW_TIME";

export const saveSelectedMovie = (movieName, movieId) => {
  return {
    type: SAVE_SELECTED_MOVIE,
    payload: {
      movieName,
      movieId,
    },
  };
};

export const setSelectedTheater = (theaterId) => {
  return (dispatch) => {
    dispatch({ type: SET_SELECTED_THEATER, payload: theaterId });
  };
};

export const setSelectedShowTime = (showTime) => {
  return (dispatch) => {
    dispatch({ type: SET_SELECTED_SHOW_TIME, payload: showTime });
  };
};
