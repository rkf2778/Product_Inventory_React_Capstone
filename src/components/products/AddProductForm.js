import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from 'react-bootstrap';
import { Prompt } from 'react-router';

const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  quantity: Yup.number().required("Quantity is required"),
  price: Yup.number().required("Price is required"),
  manufacturer:Yup.string().required("Manufacturer details required"),
  description:Yup.string().required("Descriptopn Needed")
});

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedName: "",
      submittedQuantity: "",
      submittedPrice : "",
      submittedManufacturer : "",
      submittedDescription : ""
    };
  }
    render() {
      const errorStyle={"color":"yellow","fontWeight":"bold","display":"flex","justifyContent":"center"}
      const textColor ={color :"white"}
     
    return (
        
      <Formik
        initialValues={{ name: "", quantity: "", price: "",manufacturer:"",description:"" }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}


        onSubmit={(value) => {
          this.setState({
            submittedName: value.name,
            submittedQuantity: value.quantity,
            submittedPrice : value.price,
            submittedManufacturer : value.manufacturer,
            submittedDescription : value.description
          });
          var product = {};
          product.name = value.name;
          product.quantity = value.quantity;
          product.price = value.price;
          product.manufacturer=value.manufacturer;
          product.description=value.description;
          product.views=0
          this.props.onAddProduct(product);
        }}
        
      >

        {/* <Prompt message='You have unsaved changes, are you sure you want to leave?'/> */}

        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit} style={{"margin": "0 auto","width":"30%","paddingBottom":"30px","minHeight":"100vh"}}>

          <Prompt
              when={
                !values.name ||
                !values.quantity ||
                this.state.submittedName !== values.name ||
                this.state.submittedQuantity !== values.quantity||
                this.state.submittedPrice !==values.price||
                this.state.submittedManufacturer !== values.manufacturer||
                this.state.submittedDescription !== values.description
              }
              message="You have unsaved changes, are you sure you want to leave?"
            />

          <h1 style={{"display":"flex","justifyContent":"center","fontWeight":"bold","fontSize":"50px","color":"white"}}> Add Product </h1>

            <div className="form-group">
            <label for="name" style={textColor}>Name </label>
            <input
              type="text"
              onChange={handleChange}
              value={values.name}
              placeholer="Enter Product Name"
              name="name"
              id="name"
              className="form-control"
            />
            <span style={errorStyle}>{errors.name}</span>
            </div>

            <div className="form-group">
            <label for="quantity" style={textColor}>Quantity </label>
            <input
              type="number"
              onChange={handleChange}
              value={values.quantity}
              placeholer="Enter Quantity"
              name="quantity"
              id="quantity"
              className="form-control"
            />
            <span style={errorStyle}>{errors.quantity}</span>
            </div>

            <div className="form-group">
            <label for="price" style={textColor}>Price  </label>
            <input
              type="number"
              step="1"
              onChange={handleChange}
              value={values.price}
              placeholer="Enter Price"
              name="price"
              id="price"
              className="form-control"
            />
            <span style={errorStyle}>{errors.price}</span>
            </div>

            <div className="form-group">
            <label for="description" style={textColor}>Description </label>
            <input
              type="text"
              onChange={handleChange}
              value={values.description}
              placeholer="Enter description"
              name="description"
              id="description"
              className="form-control"
            />
            <span style={errorStyle}>{errors.description}</span>
            </div>

            <div className="form-group">
            <label for="manufacturer" style={textColor}>Manufacturer </label>
            <input
              type="text"
              onChange={handleChange}
              value={values.manufacturer}
              placeholer="Enter manufacturer"
              name="manufacturer"
              id="manufacturer"
              className="form-control"
            />
            <span style={errorStyle}>{errors.manufacturer}</span>
            </div>

            
            <div style={{"display":"flex","justifyContent":"center"}}><Button type="submit" style={{"fontWeight":"bold"}}>Submit</Button></div>
          </form>
        )}
      </Formik>
    );
  }
}