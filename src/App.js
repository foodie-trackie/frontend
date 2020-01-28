import React from "react";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoggedInView from "./components/LoggedInView";
import LoggedOutView from "./components/LoggedOutView";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

function App(props) {
  return (
    <div className="App">
      {/* <Signin /> */}

      {props.loggedIn ? (
        <BrowserRouter>
          <LoggedInView />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <LoggedOutView />
        </BrowserRouter>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

export default connect(mapStateToProps)(App);
