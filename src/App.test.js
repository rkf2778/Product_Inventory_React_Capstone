import React from 'react'
import { Provider } from "react-redux";
import configureStore from "./components/redux/store/configureStore";
import { loadProduct } from "./components/redux/actions/productActions";
import { loadUser } from "./components/redux/actions/userActions";
import {mount,shallow} from 'enzyme'
import App from './App'

describe("App renders correctly", () => {
  const store = configureStore();

  store.dispatch(loadProduct());
  store.dispatch(loadUser());

    let mountwrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>)

  afterEach(() => {
    mountwrapper.unmount();
  });

  it("Snapshot matches correctly", () => {
    expect(mountwrapper).toMatchSnapshot();
  });
});

