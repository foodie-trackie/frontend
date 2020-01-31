import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Signin.css";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { setItems, login } from "../redux/actions";
import "./Login.css";
import { LinkContainer } from "react-router-bootstrap";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      succeeded: false,
      failed: false,
      error: "",
      user: {}
    };
  }

  // componentDidMount() {
  //   const csrftoken = Cookies.get("csrftoken"); // Using JS Cookies library
  //   const headers = {
  //     X_CSRFTOKEN: csrftoken
  //   };
  // axios.get("api/items/1", null, { headers }).then(response => {
  //   console.log(response);
  // });
  // }
  handleClose = () => {
    this.setState({ failed: false, succeeded: false });
  };

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
        const user = response.data;
        this.setState({ succeeded: true, user });
        // console.log(user);
        // this.props.login(user);
        const id = user.id;
        return axios.get(`api/users/${id}/items/`, null, { headers });
      })
      .then(response => {
        const items = response.data;
        console.log(response.data);
        this.props.setItems(items);
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          failed: true,
          error: "Your username or password is incorrect."
        });
      });
  };

  render() {
    return (
      <div className="login-container">
        <div className="login">
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
          <Modal show={this.state.failed} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Login Failed</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.error}</Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.succeeded} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Successfully logged in</Modal.Title>
            </Modal.Header>
            <Modal.Body>Welcome back!</Modal.Body>
            <Modal.Footer>
              <LinkContainer to="/item-list">
                <Button
                  onClick={() => {
                    this.handleClose();
                    this.props.login(this.state.user);
                  }}
                >
                  Close
                </Button>
              </LinkContainer>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  setItems: items => dispatch(setItems(items))
});

export default connect(null, mapDispatchToProps)(Login);
