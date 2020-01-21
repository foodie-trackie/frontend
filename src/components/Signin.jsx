import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Signin.css";
import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";

// import { connect } from "react-redux";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      succeeded: false,
      failed: false,
      errors: []
    };
  }

  handleClose = () => {
    this.setState({ succeeded: false, failed: false });
  };

  handleSubmit = () => {
    const csrftoken = Cookies.get("csrftoken"); // Using JS Cookies library
    const headers = {
      X_CSRFTOKEN: csrftoken
      // "Content-Type": "application/x-www-form-urlencoded"
      // "Content-Type": "application/json"
    };
    console.log(headers);
    axios
      .post(
        "api/signup/",
        {
          username: this.state.name.replace(" ", "_"),
          email: this.state.email,
          password: this.state.password,
          password1: this.state.password,
          password2: this.state.confirmPassword
        },
        { headers }
      )
      .then(() => {
        this.setState({ succeeded: true });
      })
      .catch(error => {
        const errors = _.flatten(Object.values(error.response.data)).map(
          item => item.message
        );

        console.log(errors);
        this.setState({
          failed: true,
          errors
        });
      });
  };

  render() {
    return (
      <div className="sign-in-container">
        <div className="sign-in">
          <Form>
            <Form.Group as={Row} controlId="formBasicName">
              <Form.Label column sm="4">
                User Name
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  name="name"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.currentTarget.value });
                  }}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicEmail">
              <Form.Label column sm="4">
                Email Address
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="email"
                  placeholder="Enter emial"
                  name="email"
                  value={this.state.email}
                  onChange={e => {
                    this.setState({ email: e.currentTarget.value });
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
            <Form.Group as={Row} controlId="formBasicConfirmPassword">
              <Form.Label column sm="4">
                Confirm Password
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="password"
                  placeholder="Enter password again"
                  name="password"
                  value={this.state.confirmPassword}
                  onChange={e => {
                    this.setState({ confirmPassword: e.currentTarget.value });
                  }}
                  required
                />
                <div
                  className={
                    this.state.password === this.state.confirmPassword
                      ? "valid"
                      : "invalid"
                  }
                >
                  The passwords don't match!
                </div>
              </Col>
            </Form.Group>
            {this.state.name &&
            this.state.email &&
            this.state.password &&
            this.state.password === this.state.confirmPassword ? (
              <Button
                variant="primary"
                type="button"
                onClick={this.handleSubmit}
              >
                Sign In
              </Button>
            ) : (
              <Button variant="secondary">Sign In</Button>
            )}
          </Form>
          <Modal show={this.state.succeeded} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign up successfully</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Congratulations! You have successfully created an account!
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.failed} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Error Message(s)</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.errors.map((error, key) => (
                <div key={key}>{error}</div>
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Signin;
