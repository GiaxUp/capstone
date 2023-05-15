import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import mainReducer from "../reducers/index.js";
import thunk from "redux-thunk";

const store = configureStore({ reducer: mainReducer }, applyMiddleware(thunk));

export default store;
