import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Signin.css";
import axios from "axios";
import Cookies from "js-cookie";
// import { connect } from "react-redux";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  // componentDidMount() {
  //   const csrftoken = Cookies.get("csrftoken"); // Using JS Cookies library
  //   const headers = {
  //     X_CSRFTOKEN: csrftoken
  //   };
  //   axios.get("api/items/1", null, { headers }).then(response => {
  //     console.log(response);
  //   });
  // }

  handleSubmit = () => {
    const csrftoken = Cookies.get("csrftoken"); // Using JS Cookies library
    const headers = {
      X_CSRFTOKEN: csrftoken
    };
    console.log(headers);
    axios
      .post(
        "api/login/",
        {
          username: this.state.username.replace(" ", "_"),
          password: this.state.password
        },
        { headers }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div className="add-item-container">
        <div className="add-item">
          <Form>
            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm="4">
                User Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="Enter your user name"
                  name="username"
                  value={this.state.username}
                  onChange={e => {
                    this.setState({ username: e.currentTarget.value });
                  }}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicPassword">
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={this.state.password}
                  onChange={e => {
                    this.setState({ password: e.currentTarget.value });
                  }}
                  required
                />
              </Col>
            </Form.Group>
            {this.state.username && this.state.password ? (
              <Button
                variant="primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Log In
              </Button>
            ) : (
              <Button variant="secondary">Log In</Button>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
