import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function productReducer(state = initialState.products, action) {
  switch (action.type) {
    case actionTypes.INIT:
      return action.products;

    case actionTypes.ADD:
      return [...state, Object.assign({}, action.product)];

    case actionTypes.DELETE:
      return [...state.filter((product) => product.id !== action.id)];

    case actionTypes.UPDATE:
      return [
        ...state.filter((product) => product.id !== action.product.id),
        Object.assign({}, action.product),
      ].sort( (a,b)=>(a.id>b.id)?1:-1 );

    case actionTypes.VIEW:
      let prod = [...state][action.id-1];
      prod.views++;
      //eslint-disable-next-line
      let addView =()=>( [
           ...state.filter(product => product.id !== action.id),
           Object.assign({}, prod)
         ])
      return state;

    default:
      return state;
  }
}
