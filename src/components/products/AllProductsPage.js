import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import ProductList from "./ProductList";
import Pagination from './Pagination'
import * as productActions from "../redux/actions/productActions";
import * as userActions from '../redux/actions/userActions'
import { Button } from "react-bootstrap";
import {FiSearch} from 'react-icons/fi'
import { Container, Row, Col} from "react-bootstrap";

const AllProductsPage =(props)=> {
    const [quantity, showQuantity] = useState(true);
    const [price, showPrice] = useState(true);
    const [manufacturer,showManufacturer] = useState(true);
    const data = {quantity,price,manufacturer};
    const [search,setSearch]=useState("");
    const loggedIn = props.loggedIn;

    
    //Pagination Logic
    const [currentPage,setCurrentPage] = useState(1)
    const postsPerPage = 9
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = props.products.slice(indexOfFirstPost,indexOfLastPost)

    //Change the page
    const paginate =(pageNumber)=>{
      if(currentPage!==pageNumber)setCurrentPage(pageNumber)
    }


     //const filteredSearch = props.products && props.products.filter(product=>product.name.toLowerCase().indexOf(search.toLowerCase())!==-1).sort( (a,b)=>(a.id>b.id)?1:-1 );
    const filteredSearch = currentPosts.filter(product=>
                            product.name.toLowerCase().indexOf(search.toLowerCase())!==-1).sort( (a,b)=>(a.id>b.id)?1:-1 );

    return (
      <div>

        <div style={{"display":"flex","paddingTop":"30px"}} className="container">
         { loggedIn && <Link to="/addProduct"><Button variant="primary">Add Product</Button>{" "}</Link> }

          <span style={{"marginLeft":"auto"}}><input type="text" onChange={event=>setSearch(event.target.value)}/> {" "} <FiSearch size="20px"/> </span>
        </div>

        <div style={{"display":"flex","justifyContent":"flex-end","alignItems":"space-between","paddingTop":"6px"}} className="container" >
          <label style={{"padding":"0px 5px 0px 2px","color":"white"}}><input type="checkbox"  defaultChecked={quantity} onClick={()=>showQuantity(!quantity)}/>{" "}Quantity</label>
          <label style={{"padding":"0px 5px 0px 2px","color":"white"}}><input type="checkbox"  defaultChecked={price} onClick={()=>showPrice(!price)}/>{" "}Price </label>
          <label style={{"padding":"0px 5px 0px 2px","color":"white"}}><input type="checkbox"  defaultChecked={manufacturer} onClick={()=>showManufacturer(!manufacturer)}/>{" "}Manufacturer </label>
        </div>
        
        <hr></hr>

        <div style={{minHeight:"100vh"}}>
        <ProductList 
          products={filteredSearch} 
          data={data} 
          togglePrice={showPrice}
          toggleQuantity={showQuantity}
          toggleManufacturer={showManufacturer}
          loggedIn={props.loggedIn}
        />
        <br />
        <Container>
          <Row>
          <Col></Col>
          <Col xs="auto" sm="auto" md="auto" lg="auto">
            <Pagination postsPerPage={postsPerPage} totalPosts={props.products.length} paginate={paginate} />
          </Col>
          <Col></Col>
          </Row>
        </Container>
        </div>
      </div>
    );
}

function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
    users : state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
    userAction : bindActionCreators(userActions,dispatch)
  };
}
export default (connect(mapStateToProps, mapDispatchToProps))(AllProductsPage);
