import { combineReducers } from "redux";
import allSurveysReducer from "./allSurveysReducer";
import allUsersReducer from "./allUsersReducer";
import authReducer from "./authReducer";
export default combineReducers({
  auth: authReducer,
  allSurveys: allSurveysReducer,
  allUsers: allUsersReducer
});
