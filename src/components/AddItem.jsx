import React from "react";
// import { connect } from "react-redux"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import "./AddItem.css";
import { addItem } from "../redux/actions";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
const csrftoken = Cookies.get("csrftoken"); // Using JS Cookies library
const headers = {
  X_CSRFTOKEN: csrftoken
};

const shelfLifeDays = (shelfLife, unit) => {
  if (unit === "day(s)") return shelfLife;
  if (unit === "week(s)") return shelfLife * 7;
  if (unit === "month(s)") return shelfLife * 30;
  if (unit === "year(s)") return shelfLife * 365;
};

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: 0,
      productionDate: "",
      shelfLife: 0,
      unit: "day(s)",
      expirationDate: "",
      succeeded: false,
      failed: false
    };
  }
  handleClose = () => {
    this.setState({
      succeeded: false,
      failed: false
    });
  };
  handleSubmit = () => {
    const data = {
      name: this.state.name,
      number: this.state.number,
      production_date: this.state.productionDate,
      shelf_life: this.state.shelfLife,
      expiration_date: this.state.expirationDate,
      owner: this.props.user.id
    };
    axios
      .post("api/items/", data, { headers })
      .then(response => {
        const item = {
          id: response.data.id,
          name: response.data.name,
          number: response.data.number,
          productionDate: response.data.production_date,
          shelfLife: response.data.shelf_life,
          expirationDate: response.data.expiration_date,
          owner: response.data.owner
        };
        this.props.addItem(item);
        this.setState({ succeeded: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ failed: true });
      });
  };
  render() {
    return (
      <div className="add-item-container">
        <div className="add-item">
          <Form>
            <Form.Group as={Row} controlId="formBasicName">
              <Form.Label column>Item Name</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter item name"
                  name="name"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.currentTarget.value });
                  }}
                  required
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicNumber">
              <Form.Label column>Number of Items</Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  name="number"
                  value={this.state.number}
                  onChange={e => {
                    this.setState({ number: e.currentTarget.value });
                  }}
                  required
                />
              </Col>
            </Form.Group>
            <div>
              Among the following three items, you only need to fill out two of
              them. The other one will be automatically calculated.
            </div>
            <br />
            <Form.Group as={Row} controlId="formBasicProductionDate">
              <Form.Label column>Production Date</Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  name="productionDate"
                  value={this.state.productionDate}
                  onChange={e => {
                    this.setState({ productionDate: e.currentTarget.value });
                    if (this.state.expirationDate) {
                      const shelfLife = moment(this.state.expirationDate).diff(
                        moment(e.currentTarget.value),
                        "day"
                      );
                      this.setState({ shelfLife, unit: "day(s)" });
                    } else if (this.state.shelfLife) {
                      const shelfLife = shelfLifeDays(
                        this.state.shelfLife,
                        this.state.unit
                      );
                      const expirationDate = moment(e.currentTarget.value)
                        .add(shelfLife, "d")
                        .format("YYYY-MM-DD")
                        .toString();
                      this.setState({ expirationDate });
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicShelfLife">
              <Form.Label column>Shelf Life</Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  name="shelfLife"
                  value={this.state.shelfLife}
                  onChange={e => {
                    this.setState({ shelfLife: e.currentTarget.value });
                    if (this.state.productionDate) {
                      const shelfLife = shelfLifeDays(
                        e.currentTarget.value,
                        this.state.unit
                      );
                      const expirationDate = moment(this.state.productionDate)
                        .add(shelfLife, "d")
                        .format("YYYY-MM-DD")
                        .toString();
                      this.setState({ expirationDate });
                    } else if (this.state.expirationDate) {
                      const shelfLife = shelfLifeDays(
                        e.currentTarget.value,
                        this.state.unit
                      );
                      const productionDate = moment(this.state.expirationDate)
                        .subtract(shelfLife, "d")
                        .format("YYYY-MM-DD")
                        .toString();
                      this.setState({ productionDate });
                    }
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  as="select"
                  name="unit"
                  value={this.state.unit}
                  onChange={e => {
                    this.setState({ unit: e.currentTarget.value });
                    if (this.state.productionDate) {
                      const shelfLife = shelfLifeDays(
                        this.state.shelfLife,
                        e.currentTarget.value
                      );
                      const expirationDate = moment(this.state.productionDate)
                        .add(shelfLife, "d")
                        .format("YYYY-MM-DD")
                        .toString();
                      this.setState({ expirationDate });
                    } else if (this.state.expirationDate) {
                      const shelfLife = shelfLifeDays(
                        this.state.shelfLife,
                        e.currentTarget.value
                      );
                      const productionDate = moment(this.state.expirationDate)
                        .subtract(shelfLife, "d")
                        .format("YYYY-MM-DD")
                        .toString();
                      this.setState({ productionDate });
                    }
                  }}
                >
                  <option>day(s)</option>
                  <option>week(s)</option>
                  <option>month(s)</option>
                  <option>year(s)</option>
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicExpirationDate">
              <Form.Label column>Expiration Date</Form.Label>
              <Col>
                <Form.Control
                  type="date"
                  name="expirationDate"
                  value={this.state.expirationDate}
                  onChange={e => {
                    this.setState({ expirationDate: e.currentTarget.value });
                    if (this.state.productionDate) {
                      const shelfLife = moment(e.currentTarget.value).diff(
                        moment(this.state.productionDate),
                        "day"
                      );
                      this.setState({ shelfLife, unit: "day(s)" });
                    } else if (this.state.shelfLife) {
                      const shelfLife = shelfLifeDays(
                        this.state.shelfLife,
                        this.state.unit
                      );
                      const productionDate = moment(e.currentTarget.value)
                        .subtract(shelfLife, "d")
                        .format("YYYY-MM-DD")
                        .toString();
                      this.setState({ productionDate });
                    }
                  }}
                />
              </Col>
            </Form.Group>
            <Button type="button" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
          <Modal show={this.state.succeeded} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Successfully Added</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Congratulations! You have successfully added {this.state.number}{" "}
              {this.state.name}(s) to your storage! Make sure you check foodie
              trackie often so that your items won't go to waste!
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <Modal show={this.state.failed} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Addition Failed</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              There seem to be some errors. Please try again!
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

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
