import { SET_SELECTED_SHOW_TIME } from "../actions/movieActions";

const initialState = {
  selectedShowTime: "",
};

const showReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SHOW_TIME:
      return { ...state, selectedShowTime: action.payload.selectedShowTime };
    default:
      return state;
  }
};

export default showReducer;
