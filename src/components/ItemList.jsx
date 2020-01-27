import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import moment from "moment";
import { setItems } from "../redux/actions";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: Number.POSITIVE_INFINITY,
      minusNum: {}
    };
  }
  handleChange = e => {
    this.setState({
      limit: e.target.value
    });
  };
  handleDeduct = id => {
    const csrftoken = Cookies.get("csrftoken"); // Using JS Cookies library
    const headers = {
      X_CSRFTOKEN: csrftoken
    };
    const item = this.props.items.filter(item => item.id === id)[0];
    if (this.state.minusNum[id] === 0) console.log(0);
    else if (this.state.minusNum[id] < item.number) {
      item.number -= this.state.minusNum[id];
      const data = {
        id: item.id,
        name: item.name,
        number: item.number,
        production_date: item.productionDate,
        shelf_life: item.shelfLife,
        expiration_date: item.expirationDate,
        owner: item.owner
      };
      console.log(item);
      axios
        .put(`api/items/${id}`, data, { headers })
        .then(() => {
          return axios.get(`api/users/${item.owner}/items/`, null, { headers });
        })
        .then(response => {
          const items = response.data;
          console.log(response.data);
          this.props.setItems(items);
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  };
  render() {
    const displayedItems = this.props.items.filter(
      item => dateToDuration(item.expirationDate) <= Number(this.state.limit)
    );
    return (
      <div className="item-list">
        <Form>
          <Form.Group controlId={1}>
            <Form.Label>What items do you want to display?</Form.Label>
            <Form.Control
              as="select"
              value={this.state.limit}
              onChange={this.handleChange}
            >
              <option value={Number.POSITIVE_INFINITY}>All items</option>
              <option value={0}>Items that are expiring today</option>
              <option value={1}>Items that are expiring tomorrow</option>
              <option value={3}>Items that are expiring in three days</option>
              <option value={7}>Items that are expiring in a week</option>
              <option value={30}>Items that are expiring in a month</option>
              <option value={365}>Items that are expiring in a year</option>
            </Form.Control>
          </Form.Group>
        </Form>
        {displayedItems.length ? (
          displayedItems.map((item, key) => (
            <div key={key}>
              <br />
              <Card
                bg={dateToColor(item.expirationDate)}
                style={{ width: 300 }}
              >
                <Card.Header>
                  Expires {moment(item.expirationDate).fromNow()}{" "}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.number} left</Card.Text>
                  <Form>
                    <Form.Group as={Row} controlId="formBasicNumber">
                      <Form.Label column>Just ate</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          name="number"
                          max={item.number}
                          min={0}
                          value={this.state.minusNum[item.id]}
                          onChange={e => {
                            const newMinusNum = this.state.minusNum;
                            const newValue = Number(e.currentTarget.value);

                            newMinusNum[item.id] = newValue;

                            this.setState({
                              minusNum: newMinusNum
                            });
                            console.log(this.state.minusNum);
                          }}
                          required
                        />
                      </Col>
                      <Col>
                        <Button
                          onClick={() => {
                            this.handleDeduct(item.id);
                            const newMinusNum = this.state.minusNum;
                            newMinusNum[item.id] = 0;
                            this.setState({
                              minusNum: newMinusNum
                            });
                          }}
                        >
                          Deduct
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
              <br />
            </div>
          ))
        ) : (
          <div>There is no such item.</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

const mapDispatchToProps = dispatch => ({
  setItems: items => dispatch(setItems(items))
});

const dateToDuration = date =>
  moment.duration(moment(date).diff(moment())).days();

const dateToColor = date => {
  const duration = moment.duration(moment(date).diff(moment())).days();
  if (duration <= 3) return "danger";
  if (duration <= 7) return "warning";
  if (duration <= 30) return "primary";
  return "success";
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
