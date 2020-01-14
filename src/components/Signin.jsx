import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Signin.css";
// import { connect } from "react-redux";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="add-item-container">
        <div className="add-item">
          <Form onSubmit={this.handleSubmit}>
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
              <Button variant="primary" type="submit">
                Sign In
              </Button>
            ) : (
              <Button variant="secondary">Sign In</Button>
            )}
          </Form>
        </div>
      </div>
    );
  }
}

export default Signin;