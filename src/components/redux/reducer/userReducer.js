import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function productReducer(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      return action.users;

    case actionTypes.ADD_USER:
      return [...state, Object.assign({}, action.user)];

    default:
      return state;
  }
}
