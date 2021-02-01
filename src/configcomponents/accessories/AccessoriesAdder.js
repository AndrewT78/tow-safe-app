import { Button, Form, Col, InputGroup } from "react-bootstrap";
import React from "react";
import AddAccessory from "./AddAccessory";
import AccessoryToggle from "./AccessoryToggle";

class AccessoriesAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, weight: props.accessories[0].weight, hidden: [] };
  }

  handleAddNewAccessory = (acc) => {
    this.props.handleAdd(acc);
  };

  handleDeleteAccessory = (id) => {
    this.props.handleDelete(id);
  };

  markAsAdded = (key) => {
    var newHidden = this.state.hidden;
    newHidden.push(key);
    this.setState({ hidden: newHidden });
  };

  markAsRemoved = (key) => {
    var newHidden = this.state.hidden;
    newHidden.pop(key);
    this.setState({ hidden: newHidden });
  };

  getSampleAccessories() {
    return this.props.accessories.map((prop, key) => {
      if (this.state.hidden.indexOf(key) < 0) {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.accessory}>
            <AccessoryToggle
              accessory={prop}
              handleAddAccessory={(acc) => {
                this.handleAddNewAccessory(acc);
                this.markAsAdded(key);
              }}
              handleDeleteAccessory={(id) => {
                this.handleDeleteAccessory(id);
                this.markAsRemoved(key);
              }}
              toggle={false}
            ></AccessoryToggle>
          </div>
        );
      } else {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.accessory}>
            <AccessoryToggle
              accessory={prop}
              handleAddAccessory={(acc) => {
                this.handleAddNewAccessory(acc);
                this.markAsAdded(key);
              }}
              handleDeleteAccessory={(id) => {
                this.handleDeleteAccessory(id);
                this.markAsRemoved(key);
              }}
              toggle={true}
            ></AccessoryToggle>
          </div>
        );
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
