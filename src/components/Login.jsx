import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Signin.css";
// import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
            {this.state.email && this.state.password ? (
              <Button variant="primary" type="submit">
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
