import React,{useEffect} from 'react';
import { Link} from 'react-router-dom';
import {withRouter} from 'react-router'
import {Button, Card} from 'react-bootstrap'
import { connect } from "react-redux";
import * as productActions from "../redux/actions/productActions";
import { bindActionCreators } from "redux";


const ProductDetail=(props)=>{
    useEffect(() => {

        console.log("PROPIES ",props.location.productName.id+" "+props.location.productName.views)
        props.actions.addView(props.location.productName.id,props.location.productName.views)
    
    },[props.actions,props.location.productName.id,props.location.productName.views])
    const style={"display":"flex", "justifyContent":"center","alignItems":"center","minHeight":"100vh"}
    return(
            <div style={style}>
                <Card style={{ width: "18rem","borderRadius":"30px" }} >
                    <Card.Body style={{style}}>
                        <Card.Title style={{"fontSize":"30px","fontWeight":"bold","display":"flex", "justifyContent":"center"}}> {props.location.productName.name} </Card.Title>
                        <Card.Text><strong>Quantity    :</strong>{props.location.productName.quantity}</Card.Text>
                        <Card.Text><strong>Price       :</strong>{props.location.productName.price}</Card.Text>
                        <Card.Text><strong>Manufacturer:</strong>{props.location.productName.manufacturer}</Card.Text>
                        <Card.Text><strong>Description :</strong>{props.location.productName.description}</Card.Text>
                        <div>
                        <Link to="/"><Button variant="primary" style={{ height: "6vh","fontWeight":"bold" }}>Back</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        );
}

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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ProductDetail)); 