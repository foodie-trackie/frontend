import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import Signin from "./Signin";
import Login from "./Login";

function LoggedOutView() {
  return (
    <div className="logged-in-view">
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Foodie Trackie</Navbar.Brand>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Log in</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>Sign in</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Login />
    </div>
  );
}

export default LoggedOutView;
