import { SAVE_SELECTED_MOVIE } from "../actions/movieActions";

const initialState = {
  selectedMovie: {
    movieName: "",
    movieId: "",
  },
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: {
          movieName: action.payload.movieName,
          movieId: action.payload.movieId,
        },
      };
    default:
      return state;
  }
};

export default movieReducer;
