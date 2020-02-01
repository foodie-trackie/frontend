import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import Signin from "./components/Signin";
import AddItem from "./AddItem";
import ItemList from "./ItemList";
import { Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function LoggedInView() {
  return (
    <div className="logged-in-view">
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Foodie Trackie</Navbar.Brand>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link>About</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/add-item">
              <Nav.Link>Add Item</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/item-list">
              <Nav.Link>View Items</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          {/* <Nav.Item><Nav.Link></Nav.Link></Nav.Item> */}
        </Nav>
      </Navbar>
      <Switch>
        {/* <Route path="/about" component={about} /> */}
        {/* <Route exact path="/" component={ItemList} /> */}
        <Route path="/add-item" component={AddItem} />
        <Route path="/item-list" component={ItemList} />
      </Switch>
    </div>
  );
}

export default LoggedInView;
