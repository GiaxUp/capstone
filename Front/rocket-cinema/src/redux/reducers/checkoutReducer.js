import { SAVE_SELECTED_MOVIE, SET_SELECTED_THEATER, SET_SELECTED_SHOW_TIME, SET_SELECTED_SHOW_ID, SELECT_SEATS, CONFIRM_SEATS } from "../actions/movieActions";

const initialState = {
  selectedMovie: {
    movieName: "",
    movieId: "",
  },
  selectedTheater: "",
  selectedShowTime: "",
  selectedShow: "",
  requestedSeats: [],
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: {
          movieName: action.payload.movieName,
          movieId: action.payload.movieId,
        },
      };
    case SET_SELECTED_THEATER:
      return {
        ...state,
        selectedTheater: action.payload,
      };
    case SET_SELECTED_SHOW_TIME:
      return { ...state, selectedShowTime: action.payload };
    case SET_SELECTED_SHOW_ID:
      return {
        ...state,
        selectedShow: action.payload,
      };
    case SELECT_SEATS:
      return {
        ...state,
        requestedSeats: action.payload.seats,
      };
    case CONFIRM_SEATS:
      return {
        ...state,
        requestedSeats: action.payload.selectedSeats,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
