import React from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import ProductForm from "./AddProductForm";
import * as productActions from "../redux/actions/productActions";

class AddProductPage extends React.Component {
  constructor(props) {
    super(props);
    toastr.options.timeOut = 1000;
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(product) {
    this.props.history.push("/");
    toastr.options = {
        positionClass : 'toast-top-full-width',
        hideDuration: 300,
        timeOut: 2000
        }
    this.props.actions
      .addProduct(product)
      .then(() => toastr.success("Product added"))
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return <ProductForm onAddProduct={this.addProduct} />;
  }
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

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(AddProductPage));