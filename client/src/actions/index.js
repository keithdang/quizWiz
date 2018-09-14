import axios from "axios";
import { FETCH_USER, FETCH_ALL_SURVEYS, FETCH_ALL_USERS } from "./types";
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const selectSurvey = value => async dispatch => {
  const res = await axios.post("/api/select/survey", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const fetchAllSurveys = () => async dispatch => {
  const res = await axios.get("/api/quiz");
  dispatch({ type: FETCH_ALL_SURVEYS, payload: res.data });
};
export const submitSurvey = value => async dispatch => {
  const res = await axios.post("/api/submit/survey", value);
  dispatch({ type: FETCH_USER, payload: res.data });
};
export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get("/api/all/users");
  dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};
