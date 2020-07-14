import React from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

const validationSchema = Yup.object({
    name: Yup.string().required("Product Name is required"),
    quantity: Yup.number().required("Quantity is required"),
    price: Yup.number().required("Price is required"),
    manufacturer:Yup.string().required("Manufacturer details required"),
    description:Yup.string().required("Descriptopn Needed")
  });

const EditProduct = (props) => {
  const errorStyle = { color: "red", fontWeight: "bold" };

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ name: props.product.name,description: props.product.description,manufacturer: props.product.manufacturer,price: props.product.price,quantity: props.product.quantity,  }}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(value) => {
              var editedProduct = {};
              toastr.options = {
                positionClass: "toast-top-full-width",
                hideDuration: 300,
                timeOut: 2000,
              };
              toastr.clear();
              setTimeout(() => {
                props.history.push("/");
                editedProduct.id          = props.product.id;
                editedProduct.name        = value.name;
                editedProduct.description = value.description;
                editedProduct.price       = value.price;
                editedProduct.quantity    = value.quantity;
                editedProduct.maufacturer = value.maufacturer;
                props.actions.updateProduct(editedProduct)
                  .then(() => toastr.success("Product Edited"));
              }, 500);
              props.handleClose();

            }}
          >

        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit} style={{"margin": "0 auto","width":"30%"}}>

            <div className="form-group">
            <label for="name">Name : </label>
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
            <label for="quantity">Quantity : </label>
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
            <label for="price">Price : </label>
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
            <label for="description">Description : </label>
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
            <label for="manufacturer">Manufacturer : </label>
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

                <Modal.Footer>
                  <Button variant="secondary" onClick={() => props.handleClose()} > Close </Button>
                  <Button type="submit" variant="primary" > Update </Button>
                </Modal.Footer>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default withRouter(EditProduct);
