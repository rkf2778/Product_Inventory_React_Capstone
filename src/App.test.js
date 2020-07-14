import React from 'react'
import App from './App';
import {shallow} from 'enzyme';
import AllProductsPage from './components/products/AllProductsPage';

let wrapper;

beforeEach(()=>{
    wrapper = shallow(<App/>);
});

it('displays All Products Page',()=>{
    expect(wrapper.find(AllProductsPage).length).toEqual(1);
})