import dataApi from "../../server/dataAPI";
import * as actionTypes from "../actions/actionTypes";

//======================LOADING A PRODUCT
export function loadProduct() {
  return function (dispatch) {
    return dataApi
      .getAllProducts()
      .then((products) => {
        dispatch({ type: actionTypes.INIT, products });
      })
      .catch((error) => {
        throw error;
      });
  };
}
//==========================ADDING A PRODUCT
export function addProduct(product) {
  return function (dispatch) {
    return dataApi
      .addProduct(product)
      .then((product) => {
        dispatch({ type: actionTypes.ADD, product });
      })
      .catch((error) => {
        throw error;
      });
  };
}

//==========================DELETE A PRODUCT
export function deleteProduct(id) {
  return function (dispatch) {
    return dataApi
      .deleteProduct(id)
      .then((product) => {
        dispatch({ type: actionTypes.DELETE, id});
      })
      .catch((error) => {
        throw error;
      });
  };
}

//==========================UPDATE A PRODUCT
export function updateProduct(product) {
    return function (dispatch) {
      return dataApi
        .updateProduct(product)
        .then((product) => {
          dispatch({ type: actionTypes.UPDATE, product });
        })
        .catch((error) => {
          throw error;
        });
    };
  }

  //Increase View Count of product
  export function addView(id,count){
    console.log("func called")
    return function (dispatch){
      console.log("api to be called")
      return dataApi.addView(id,count)
      .then((product)=>{
        console.log("dispatched")
        dispatch({type:actionTypes.VIEW, id: product.id})
      })
    }
  }
