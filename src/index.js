import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

import { Provider } from "react-redux";
import configureStore from "./components/redux/store/configureStore";
import { loadProduct } from "./components/redux/actions/productActions";
import { loadUser } from "./components/redux/actions/userActions";
//import * as serviceWorker from './serviceWorker';

const store = configureStore();

store.dispatch(loadProduct())
store.dispatch(loadUser())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
