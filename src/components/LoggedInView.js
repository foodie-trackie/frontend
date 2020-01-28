import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import Signin from "./components/Signin";
// import AddItem from "./components/AddItem";
import ItemList from "./ItemList";

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
            <Nav.Link>Add Item</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>View Items</Nav.Link>
          </Nav.Item>
          {/* <Nav.Item><Nav.Link></Nav.Link></Nav.Item> */}
        </Nav>
      </Navbar>
      <ItemList />
    </div>
  );
}

export default LoggedInView;
