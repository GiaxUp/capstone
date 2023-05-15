import { combineReducers } from "redux";
import authReducer from "./authReducer";
// Importa altri reducers se necessario

const mainReducer = combineReducers({
  auth: authReducer,
  // Aggiungi altri reducers qui
});

export default mainReducer;
