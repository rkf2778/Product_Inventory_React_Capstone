import React, { useState,lazy, Suspense } from "react";
import { BrowserRouter as Router,Route,Switch,NavLink,Link,Redirect} from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import logo from "./assets/images/MainLogo.jpeg";
import * as productActions from "./components/redux/actions/productActions";
import * as userActions from './components/redux/actions/userActions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FaFileExport } from "react-icons/fa";
import {MdAccountCircle,MdContentPaste} from 'react-icons/md'
const Login = lazy(()=>import('./components/user/Login'))
const Register=lazy(()=>import("./components/user/Register"))
const MostViewed = lazy(()=>import('./components/chart/MostViewed'))
const Profile = lazy(()=>import('./components/user/Profile'))
const AllProductsPage = lazy(()=>import("./components/products/AllProductsPage"))
const ProductDetail = lazy(()=>import('./components/products/ProductDetail'))
const AddProduct = lazy(()=>import('./components/products/AddProduct'))
const About = lazy(()=>import('./components/user/About'))
// import Login from "./components/user/Login";
// import Register from "./components/user/Register";
// import MostViewed from './components/chart/MostViewed';
// import Profile from './components/user/Profile';
// import AllProductsPage from "./components/products/AllProductsPage";
// import ProductDetail from './components/products/ProductDetail'
// import AddProduct from './components/products/AddProduct'
// import About from './components/user/About';

function App(props) {
  //Login modal
  const [show, setShow] = useState(false);
  const handleClose     = () => setShow(false);
  const handleShow      = () => {setShow(true)}
  //Login Status
  
  const [loggedIn, setLogin] = useState(localStorage.getItem("auth")!==null? JSON.parse(localStorage.getItem("auth")) :false);
  const handleLogin = () => {setLogin(JSON.parse(localStorage.getItem("auth")))}

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const NavStyle = { color: "white","textDecoration":"none","outline":"none","fontWeight": "bold","padding":"0px 8px 0px 8px"  }
  
  




  const Header = (props) => (
   
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        
          <Navbar.Brand>
          <Link to="/">
            <img
              alt=""
              src={logo}
              style={{ paddingRight: "20px","borderRadius":"50px" }}
              width="80"
              height="50"
              className="d-inline-block align-top"
            />
            </Link>
          </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <NavLink to="/" exact={true} style={NavStyle} activeStyle={{ "color": "red"}} >
                Home
              </NavLink>
            
              <NavLink to="/about" exact={true} style={NavStyle} activeStyle={{ "color": "red"}} >
                About
              </NavLink>

            {loggedIn &&
            (

              <NavLink to="/chart" exact={true} style={NavStyle} activeStyle={{ "color": "red" }} >
              Most Viewed Products
              </NavLink>
            )}

            {loggedIn &&
            (
              
              <NavLink to="/profile" exact={true} style={NavStyle} activeStyle={{ "color": "red" }} >
                  My Profile
                </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>


          {!loggedIn && (
            <Link to='/register'>
            <Button variant="success" style={{"marginRight":"30px","fontWeight":"bold"}}>  
              <MdContentPaste/>{" "}Register
            </Button>
              </Link>
          )}

          {loggedIn ? (
            <div>
              <Navbar.Text style={{ color: "white", paddingRight: "20px" }}>
              <MdAccountCircle/> {currentUser!==null ? (currentUser.map(user=>user.name.firstName)) : false }
              </Navbar.Text>

              <Button variant="danger" onClick={()=>{localStorage.setItem("auth",false);
                                                    setLogin(JSON.parse(localStorage.getItem("auth")));
                                                    localStorage.clear();}}>
              <FaFileExport/>{" "}Logout
              </Button>
            </div>
          ) : (
            <Button variant="primary" onClick={()=>handleShow()} style={{"fontWeight":"bold"}}>{" "}
              Login{" "}
            </Button>
          )}
      </Navbar>

      <Login show={show} handleClose={handleClose} handleLogin={handleLogin} users={props.users}/>
    </div>
  );


  const Footer = ()=>{
    return(<footer>
          <p style={{"textAlign":"center","backgroundColor":"#333","color":"white","padding":"20px"}}>Copyright @2020, Rohit K F</p>
        </footer>)
  }

  return (
    <Suspense fallback={<h1>Loading.....</h1>}>
    <Router>
      <Header loggedIn={loggedIn} handleLogin={handleLogin} users={props.users}/>
      <Switch>
        <Route exact={true} path="/"     render={(props)=><AllProductsPage {...props} loggedIn={loggedIn} />}   />
        <Route path="/about"             component={About}/> 
        <Route path="/register"          component={Register}/>
        <Route path="/ProductDetail"     component={() => loggedIn ? (<ProductDetail/>) : ( <Redirect to="/"/>) }/>
        <Route path="/ProductDetail/:id" component={() => loggedIn ? (<ProductDetail/>) : ( <Redirect to="/"/>) }/>
        <Route path="/addProduct"        component={() => loggedIn ? (<AddProduct/>)    : ( <Redirect to="/"/>) }/>
        <Route path="/chart"             component={() => loggedIn ? (<MostViewed/>)    : ( <Redirect to="/"/>) }/> 
        <Route path="/profile"           component={() => loggedIn ? (<Profile/>)       : ( <Redirect to="/"/>) }/>
        <Route                           component={() => <h1 style={{"display":"flex","justifyContent":"center","padding-top":"150px","minHeight":"100vh"}}>Page NOT FOUND</h1> }/>      
      </Switch>
      <Footer/>
    </Router>
    </Suspense>
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

export default connect(mapStateToProps,mapDispatchToProps)(App);