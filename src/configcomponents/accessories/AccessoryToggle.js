import React, { useState } from "react";

import { Form, Button, Col, InputGroup } from "react-bootstrap";
import { FaCheck, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

class AccessoryToggle extends React.Component {
  constructor(props) {
    super(props);

    if (props.accessory) {
      this.state = {
        accessory: props.accessory.accessory,
        weight: props.accessory.weight,
        toggle: props.toggle,
        id: props.accessory.id,
      };
    }
  }

  updateAccessory = (input) => {
    this.setState({ accessory: input });
  };

  updateWeight = (input) => {
    this.setState({ weight: parseFloat(input) });
  };

  formComplete = () => {
    return this.state.accessory != "" && this.state.weight > 0;
  };

  toggleOn = () => {
    this.props.handleAddAccessory({
      accessory: this.state.accessory,
      weight: this.state.weight,
      id: this.state.id,
    });

    this.setState({ toggle: true });
  };

  toggleOff = () => {
    this.props.handleDeleteAccessory(this.state.id);
    this.setState({ toggle: false });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Accessory"
              onChange={(e) => this.updateAccessory(e.target.value)}
              value={this.state.accessory}
              onFocus={(e) => e.target.select()}
              disabled={this.state.toggle}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              placeholder="kg"
              value={this.state.weight}
              onChange={(e) => this.updateWeight(e.target.value)}
              onFocus={(e) => e.target.select()}
              disabled={this.state.toggle}
            />
          </Col>
          <Col xs={2}>
            {this.state.toggle ? (
              <Button
                onClick={this.toggleOff}
                variant="primary"
                block
                data-testid="btn-acc-on"
              >
                <FaCheck></FaCheck>
              </Button>
            ) : (
              <Button
                onClick={this.toggleOn}
                disabled={!this.formComplete()}
                block
                variant="outline-primary"
                block
                data-testid="btn-acc-off"
              >
                Add
              </Button>
            )}
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default AccessoryToggle;
