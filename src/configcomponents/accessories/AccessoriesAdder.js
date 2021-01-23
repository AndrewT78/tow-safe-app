import { Button, Form, Col, InputGroup } from "react-bootstrap";
import React from "react";
import AddAccessory from "./AddAccessory";

class AccessoriesAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, weight: props.accessories[0].weight, hidden: [] };
  }

  handleAddNewAccessory = (acc) => {
    this.props.handleAdd(acc);
  };

  markAsAdded = (key) => {
    var newHidden = this.state.hidden;
    newHidden.push(key);
    this.setState({ hidden: newHidden });
  };

  getSampleAccessories() {
    return this.props.accessories.map((prop, key) => {
      if (this.state.hidden.indexOf(key) < 0) {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.accessory}>
            <AddAccessory
              accessory={prop}
              handleAccessory={(acc) => {
                this.handleAddNewAccessory(acc);
                this.markAsAdded(key);
              }}
            ></AddAccessory>
          </div>
        );
      } else {
        return <div key={prop.accessory}></div>;
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>{this.getSampleAccessories()}</div>
    );
  }
}

export default AccessoriesAdder;
