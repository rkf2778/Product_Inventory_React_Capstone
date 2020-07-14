import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Profile() {
  const curentUser = JSON.parse(localStorage.getItem("user"));
  const style = { display: "flex", justifyContent: "center", color: "white" };
  const userNode = curentUser.map((user) => {
    return (
      <div>
        <li style={style} key={user.name.firstName}>
          <strong>Name</strong>
          {" : " + user.name.firstName + " " + user.name.lastName}
        </li>
        <li style={style} key={user.email}>
          <strong>Email</strong>
          {" : " + user.email}
        </li>
        <li style={style} key={user.location}>
          <strong>Location</strong>
          {" : " + user.location}
        </li>
        <li style={style} key={user.mobile}>
          <strong>Mobile</strong>
          {" : " + user.mobile}
        </li>
      </div>
    );
  });
  return (
    <Container style={{minHeight:"100vh"}}>
      <Row style={{ paddingTop: "200px" }}>
        <Col></Col>
        <Col xs="auto" sm="auto" md="auto">
          <div>
            <h1 style={style}> User Profile </h1>
            <div>{userNode}</div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
