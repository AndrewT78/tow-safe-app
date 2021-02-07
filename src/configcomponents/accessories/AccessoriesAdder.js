import { Button, Form, Col, Row } from "react-bootstrap";
import React from "react";
import AddAccessory from "./AddAccessory";
import AccessoryToggle from "./AccessoryToggle";

class AccessoriesAdder extends React.Component {
  handleAddNewAccessory = (acc) => {
    this.props.handleAdd(acc);
  };

  handleDeleteAccessory = (id) => {
    this.props.handleDelete(id);
  };

  getSampleAccessories() {
    return this.props.accessories.map((prop, key) => {
      if (!prop.exists) {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.accessory}>
            <AccessoryToggle
              accessory={prop}
              handleAddAccessory={(acc) => {
                this.handleAddNewAccessory(acc);
              }}
              handleDeleteAccessory={(id) => {
                this.handleDeleteAccessory(id);
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
              }}
              handleDeleteAccessory={(id) => {
                this.handleDeleteAccessory(id);
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
      <div style={{ marginTop: "20px" }}>
        <Row style={{ marginBottom: 5 }}>
          <Col style={{ paddingLeft: 20 }}>Accessory</Col>
          <Col style={{ paddingLeft: 20 }} xs={2}>
            kg
          </Col>
          <Col xs={2}></Col>
        </Row>
        {this.getSampleAccessories()}
      </div>
    );
  }
}

export default AccessoriesAdder;
