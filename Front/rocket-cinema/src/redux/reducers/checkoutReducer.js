import { SAVE_SELECTED_MOVIE, SET_SELECTED_THEATER, SET_SELECTED_SHOW_TIME, SET_SELECTED_SHOW_ID } from "../actions/movieActions";

const initialState = {
  selectedMovie: {
    movieName: "",
    movieId: "",
  },
  selectedTheater: "",
  selectedShowTime: "",
  selectedShow: "",
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
    default:
      return state;
  }
};

export default checkoutReducer;
