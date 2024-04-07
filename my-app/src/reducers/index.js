import { combineReducers } from "redux";

import authReducers from "./authReducers";

import postReducer from "./postReducer";

export const reducers = combineReducers({authReducers, postReducer});