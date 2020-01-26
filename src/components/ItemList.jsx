import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
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
      view: "all"
    };
  }
  render() {
    return (
      <div className="item-list">
        {this.props.items.map((item, key) => (
          <Card bg={dateToColor(item.expirationDate)} key={key}>
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
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items
});

const dateToColor = date => {
  const duration = moment.duration(moment(date).diff(moment())).days();
  if (duration <= 3) return "danger";
  if (duration <= 7) return "warning";
  if (duration <= 30) return "primary";
  return "success";
};

export default connect(mapStateToProps)(ItemList);
