import React,{useState} from "react";
import { Link } from "react-router-dom";
import { Prompt, withRouter } from "react-router";
import { connect } from "react-redux";
import * as productActions from "../redux/actions/productActions";
import { bindActionCreators } from "redux";
import { Card, Button } from "react-bootstrap";
import toastr from "toastr";
import EditProduct from './EditProduct'
import {MdDelete,MdVisibility,MdCreate} from 'react-icons/md'


const Product = (props) => {



  const [show, setShow] = useState(false);
  const handleClose     = () => setShow(false);
  const handleShow      = () => setShow(true);
  
  const isLoggedIn = props.loggedIn
  const checkUser = (e) => {
      if (!isLoggedIn) {
        e.preventDefault();
        toastr.options = { positionClass: "toast-top-full-width",hideDuration: 300,timeOut: 2000,};
        toastr.clear();
        setTimeout(() => toastr.warning("Login to view details"), 0);
      }
  };

  const deleteProduct = () => {
    props.actions.deleteProduct(props.id)
  };
  //<Link to={'/ProductDetail/'+props.id}  >

  const product = {
    id :props.id,name:props.name,quantity:props.quantity,description:props.description,manufacturer:props.manufacturer,price:props.price
  }

  return (
    <>
    <Card style={{ width: "18rem", "borderRadius":"30px","border":"3px solid" }} >
      {isLoggedIn && (
        <Prompt when={isLoggedIn}
          message={(location) => location.pathname.includes("/ProductDetail/") ? `Are you sure you want to view the details ?` : true }
        />
      )}
      <Card.Body>
        <Card.Title style={{"fontSize":"30px","fontWeight":"bold","textAlign":"center"}}> {props.name} </Card.Title>
        {props.data.quantity && ( <Card.Text> Quantity : {props.quantity} </Card.Text> )}
        {props.data.manufacturer && <Card.Text> Manufacturer : {props.manufacturer}</Card.Text>}
        {props.data.price && <Card.Text>$ {props.price}</Card.Text>}

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          

          <Link
          to={{
            pathname: `/ProductDetail/${props.id}`,
            productName: {
              id: props.id,
              name: props.name,
              price: props.price,
              quantity: props.quantity,
              description: props.description,
              manufacturer: props.manufacturer,
              views:props.views
            },
          }}
        >
            <Button variant="primary" onClick={(event) => checkUser(event)} style={{ "fontWeight":"bold" }} > 
                {!isLoggedIn && <span style={{"paddingRight":"5px"}}>View</span> }
                {!isLoggedIn && <MdVisibility color="black"/> }
                {isLoggedIn && <MdVisibility/>}
            </Button>
          </Link>
          {isLoggedIn &&   <Button variant="success" style={{"fontWeight":"bold"  }} onClick={() => handleShow()} ><MdCreate/></Button> }    
          {isLoggedIn &&     <Button variant="danger" style={{"fontWeight":"bold"  }} onClick={() => deleteProduct()} ><MdDelete/> </Button>}
             
        </div>
      </Card.Body>
    </Card>
    <EditProduct show={show} handleClose={handleClose} actions={props.actions} product={product}/>
    </>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productActions, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Product));
