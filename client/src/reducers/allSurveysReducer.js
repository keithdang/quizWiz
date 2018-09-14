import { FETCH_ALL_SURVEYS } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_ALL_SURVEYS:
      return action.payload || false;
    default:
      return state;
  }
}
