import { combineReducers } from "redux";
import authReducer from "./authReducer";
import checkoutReducer from "./checkoutReducer";
// Importa altri reducers se necessario

const mainReducer = combineReducers({
  auth: authReducer,
  checkout: checkoutReducer,
  // Aggiungi altri reducers qui
});

export default mainReducer;
