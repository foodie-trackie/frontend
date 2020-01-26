import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import moment from "moment";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: Number.POSITIVE_INFINITY
    };
  }
  handleChange = e => {
    this.setState({
      limit: e.target.value
    });
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
                </Card.Body>
                {/* <ListGroup>
              <ListGroupItem>{item.name}</ListGroupItem>
              <ListGroupItem>{item.number} left</ListGroupItem>
              <ListGroupItem></ListGroupItem>
            </ListGroup> */}
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

const dateToDuration = date =>
  moment.duration(moment(date).diff(moment())).days();

const dateToColor = date => {
  const duration = moment.duration(moment(date).diff(moment())).days();
  if (duration <= 3) return "danger";
  if (duration <= 7) return "warning";
  if (duration <= 30) return "primary";
  return "success";
};

export default connect(mapStateToProps)(ItemList);
