import React from "react";
// import { connect } from "react-redux"

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      number: 0,
      productionDate: "",
      shelfLife: 0,
      unit: "day(s)",
      expirationDate: ""
    };
  }
  render() {
    return <div className="add-item">Add Item</div>;
  }
}

export default AddItem;
