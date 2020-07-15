import React from 'react'
import AllProductsPage from './AllProductsPage'
import ProductList from "./ProductList";
import Pagination from './Pagination'
import toJson from 'enzyme-to-json';
import {shallow,mount} from 'enzyme'
import { Provider } from "react-redux";
import configureStore from "../redux/store/configureStore";

describe('All Products Page Snapshot', () => {
    let mountwrapper;
    const store = configureStore();

    beforeEach(()=>{
        mountwrapper=mount(<Provider store={store}><AllProductsPage/></Provider>);
    })    

    afterEach(()=>{
        mountwrapper.unmount();
    })

    it('renders correctly', () => {
        expect(mountwrapper).toMatchSnapshot();
    });

});


describe('All elements renders correctly', () => {
    const store = configureStore();
    let wrapper = shallow(<Provider store={store}><AllProductsPage/></Provider>)

    it('shows the debug code',()=>{
        expect(wrapper.find(ProductList).length).toEqual(0)
    })

});