import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Signin from "./Signin";
import Login from "./Login";
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function LoggedOutView() {
  return (
    <div className="logged-in-view">
      <Navbar bg="light" variant="light">
        <Navbar.Brand>
          <img
            src={require("../images/logo.png")}
            width="50"
            height="50"
            alt="Foodie Trackie Logo"
          />
        </Navbar.Brand>
        <Navbar.Brand>Foodie Trackie</Navbar.Brand>

        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/login">
              <Nav.Link>Log in</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/signin">
              <Nav.Link>Sign in</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Switch>
        {/* <Route path="/about" component={About} /> */}
        <Route exact path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signin" component={Signin} />
      </Switch>
    </div>
  );
}

export default LoggedOutView;
