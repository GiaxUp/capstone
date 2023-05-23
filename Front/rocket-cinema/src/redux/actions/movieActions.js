export const SAVE_SELECTED_MOVIE = "SAVE_SELECTED_MOVIE";
export const SET_SELECTED_THEATER = "SET_SELECTED_THEATER";
export const SET_SELECTED_SHOW_TIME = "SET_SELECTED_SHOW_TIME";
export const SET_SELECTED_SHOW_ID = "SET_SELECTED_SHOW_ID";
export const SELECT_SEATS = "SELECT_SEATS";
export const CONFIRM_SEATS = "CONFIRM_SEATS";

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

export const setSelectedShowID = (showID) => {
  return (dispatch) => {
    dispatch({ type: SET_SELECTED_SHOW_ID, payload: showID });
  };
};

export const selectSeats = (selectedSeats) => {
  return {
    type: SELECT_SEATS,
    payload: {
      seats: selectedSeats,
    },
  };
};

export const confirmSeats = (selectedSeats) => {
  return {
    type: CONFIRM_SEATS,
    payload: {
      selectedSeats,
    },
  };
};
