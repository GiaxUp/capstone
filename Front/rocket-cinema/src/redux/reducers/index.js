import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
import showReducer from "./showReducer";
// Importa altri reducers se necessario

const mainReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  show: showReducer,
  // Aggiungi altri reducers qui
});

export default mainReducer;
