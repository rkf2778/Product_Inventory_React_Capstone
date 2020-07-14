import React from 'react'

import { Container, Row, Col} from "react-bootstrap";

const About =()=>{
    return(
     <Container>
       <Row style={{"paddingTop":"20px",minHeight:"100vh"}}>
         <Col></Col>
         <Col xs="auto" sm="auto" md="auto"><h1 style={{"color":"white","fontWeight":"bold"}}>The application is used to view and manage the products</h1></Col>
         <Col></Col>
       </Row>
     </Container>
    )
  }

  export default About;
