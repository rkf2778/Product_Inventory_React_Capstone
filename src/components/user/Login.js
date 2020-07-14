import React,{useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { withRouter } from 'react-router'
import axios from 'axios'

const Login=(props)=> {
  const [username,setUser]=useState("");
  const [password,setPass]=useState("");
  const [error,setError] = useState("");

  const checkUser = (e) => {
    e.preventDefault();
    //const user = props.users.filter(user=>user.email===username&&user.password===password)
    axios.get('http://localhost:4000/users?email='+username+'&password='+password).then(response=>response.data)
    .then(user=>{
      if (user.length!==0) {
        console.log("user found",user)
        localStorage.setItem("user",JSON.stringify(user))
        localStorage.setItem("auth",true)
        props.handleLogin();
        props.handleClose();
        props.history.push('/')
      } else {
        console.log("No Such User")
        setError("Invalid Credentials !!")
      }
    })
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {error && <div style={{"color":"red","padding-left":"60px"}}>{error}</div>}
            <label htmlFor="username">Username</label>{" "}
            <input type="text" placeholder="Enter Email ID" id="username" onChange={(e)=>setUser(e.target.value)}/><br/>
            <label htmlFor="username">Password</label>{" "}
            <input type="password" placeholder="Enter Password" id="password" onChange={(e)=>setPass(e.target.value)}/>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.handleClose()}>
                Close
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={(event) => checkUser(event)}
              >
                Login
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default withRouter(Login)
