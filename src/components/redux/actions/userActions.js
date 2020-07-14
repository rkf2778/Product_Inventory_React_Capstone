import dataApi from "../../server/dataAPI";
import * as actionTypes from "../actions/actionTypes";

//======================LOADING USERS
export function loadUser() {
  return function (dispatch) {
    return dataApi
      .getAllUsers()
      .then((users) => {
        dispatch({ type: actionTypes.LOAD_USERS, users });
      })
      .catch((error) => {
        throw error;
      });
  };
}
//==========================ADDING A USER
export function addUser(user) {
  return function (dispatch) {
    return dataApi
      .addUser(user)
      .then((user) => {
        dispatch({ type: actionTypes.ADD_USER, user });
      })
      .catch((error) => {
        throw error;
      });
  };
}