import React from "react";
import AccessoryItem from "./AccessoryItem";

class AccessoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAccItemRows() {
    return this.props.accessories.map((prop, key) => {
      return (
        <AccessoryItem
          key={key}
          accessory={prop}
          handleDelete={this.props.handleDelete}
        ></AccessoryItem>
      );
    });
  }

  render() {
    return <div style={{ marginTop: "20px" }}>{this.getAccItemRows()}</div>;
  }
}

export default AccessoryList;
