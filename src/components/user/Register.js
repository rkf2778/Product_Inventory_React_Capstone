import React,{ useRef,useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from 'react-bootstrap';
import toastr from 'toastr';
import axios from 'axios'
import { withRouter,Prompt } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css'
const validationSchema = Yup.object({
  email : Yup.string().email().required("Email Required"),
  password : Yup.string().min(8).max(16).required("Password Required"),
  passwordConfirmation : Yup.string().when("password", {
    is: val => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    )
  }),
  firstName : Yup.string().required("First Name Required"),
  lastName : Yup.string().required("Last Name Required"),
  location : Yup.string().required("Location Required"),
  mobile : Yup.number().min(10).required("Mobile Number Required"),
});

 const Register =(props)=> {
     const passRef = useRef('password')
     const errorStyle = {color : "yellow","fontWeight":"bold","display":"flex","justifyContent":"center"}
     const textColor ={color :"white"}
     const [submitedData,setSubmittedData]=useState({email:"",password:"",firstName:"",lastName:"",mobile:""})
  return (
      <Formik
        
        initialValues={{ email:"",password:"",firstName:"",lastName:"",location:"",mobile:"" }}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}

        onSubmit={(value) => {
        setSubmittedData({email:value.email,password:value.password,firstName:value.firstName,lastName:value.lastName,location:value.location,mobile:value.mobile})
        var user = {};
        toastr.options = {
        positionClass : 'toast-top-full-width',
        hideDuration: 300,
        timeOut: 2000
        }
        toastr.clear();
         setTimeout(()=>
         {
          props.history.push('/')
          user.email = value.email;
          user.password = value.password;
          user.name = {firstName: value.firstName,lastName:value.lastName}
          user.location=value.location;
          user.mobile=value.mobile;
          axios.post('http://localhost:4000/users',user)
          .then(()=>toastr.success("User added"))
          },2000);
        
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit} style={{"margin": "0 auto","width":"30%","paddingBottom":"30px","minHeight":"100vh"}}>

          <Prompt
              when={
                !values.email ||
                !values.password ||
                !values.firstName||
                !values.lastName||
                !values.location||
                !values.mobile||
                submitedData.email !== values.email ||
                submitedData.password !== values.password||
                submitedData.firstName !==values.firstName||
                submitedData.lastName !==values.lastName||
                submitedData.location !==values.location||
                submitedData.mobile !==values.mobile
              }
              message="You have unsaved changes, are you sure you want to leave?"
            />


            <h1 style={{"display":"flex","justifyContent":"center","fontWeight":"bold","fontSize":"50px","color":"white"}}> User Registration </h1>
           
           <div className="form-group" 
              >
           <label for="email" style={textColor}>Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={handleChange}
              value={values.email}
              name="email"
            />

<span style={errorStyle}>{errors.email}</span>
           </div>

            <div className="form-group">
           <label for="password" style={textColor}>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              value={values.password}
              name="password"
              ref={passRef}
            />
           </div>
            <span style={errorStyle}>{errors.password}</span>

            <div className="form-group">
           <label for="passwordConfirmation" style={textColor}>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
              onChange={handleChange}
              value={values.passwordConfirmation}
              name="passwordConfirmation"
            />
           </div>
            <span style={errorStyle}>{errors.passwordConfirmation}</span>

            <div className="form-group">
           <label for="firstName" style={textColor}>First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
            />
           </div>
            <span style={errorStyle}>{errors.firstName}</span>

            <div className="form-group">
           <label for="lastName" style={textColor}>Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
            />
           </div>
            <span style={errorStyle}>{errors.lastName}</span>

            <div className="form-group">
           <label for="location" style={textColor}>Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              onChange={handleChange}
              value={values.location}
              name="location"
            />
           </div>
            <span style={errorStyle}>{errors.location}</span>

            <div className="form-group">
           <label for="mobile" style={textColor}>Mobile No.</label>
            <input
              type="text"
              className="form-control"
              id="mobile"
              onChange={handleChange}
              value={values.mobile}
              name="mobile"
            />
           </div>
            <span style={errorStyle}>{errors.mobile}</span>
            <br/>
            <div style={{"display":"flex","justifyContent":"center"}}><Button type="submit" style={{"fontWeight":"bold"}}>Submit</Button></div>
          </form>
        )}
      </Formik>
    );
}

export default withRouter(Register);