import { combineReducers } from "redux";
import authReducer from "./authReducer";
import movieReducer from "./movieReducer";
// Importa altri reducers se necessario

const mainReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  // Aggiungi altri reducers qui
});

export default mainReducer;
