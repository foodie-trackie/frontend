import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import Signin from "./components/Signin";
// import AddItem from "./components/AddItem";
import ItemList from "./components/ItemList";
import Login from "./components/Login";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      {/* <Signin /> */}
      {props.loggedIn ? <ItemList /> : <Login />}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(App);
