import { SET_SELECTED_THEATER } from "../actions/movieActions";

const initialState = {
  selectedTheater: {
    selectedTheater: "",
  },
};

const theaterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_THEATER:
      return {
        ...state,
        selectedTheater: {
          theaterID: action.payload.theaterID,
        },
      };
    default:
      return state;
  }
};

export default theaterReducer;
