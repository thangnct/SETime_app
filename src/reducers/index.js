import { combineReducers } from "redux";
import authReducer from "./auth"
import workReducer from "./work"

export default combineReducers({
    auth: authReducer,
    work: workReducer
});