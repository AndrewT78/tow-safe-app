import React, { useState } from "react";

import { Form, Button, Col, InputGroup } from "react-bootstrap";
import { FaCheck, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";

class LoadToggle extends React.Component {
  constructor(props) {
    super(props);

    if (props.load) {
      this.state = {
        item: props.load.item,
        weight: props.load.weight,
        toggle: props.toggle,
        id: props.load.id,
        quantity: props.load.quantity,
      };
    }
  }

  updateLoad = (input) => {
    this.setState({ item: input });
  };

  updateWeight = (input) => {
    this.setState({ weight: parseFloat(input) });
  };

  updateQuantity = (input) => {
    this.setState({ quantity: parseFloat(input) });
  };

  formComplete = () => {
    return (
      this.state.item != "" && this.state.weight > 0 && this.state.quantity > 0
    );
  };

  toggleOn = () => {
    this.props.handleAddLoad({
      item: this.state.item,
      weight: this.state.weight,
      quantity: this.state.quantity,
      id: this.state.id,
    });

    this.setState({ toggle: true });
  };

  toggleOff = () => {
    this.props.handleDeleteLoad(this.state.id);
    this.setState({ toggle: false });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Item Name"
              onChange={(e) => this.updateLoad(e.target.value)}
              value={this.state.item}
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
            <Form.Control
              type="number"
              placeholder="Qty"
              value={this.state.quantity}
              onChange={(e) => this.updateQuantity(e.target.value)}
              onFocus={(e) => e.target.select()}
              disabled={this.state.toggle}
            />
          </Col>
          <Col xs={3}>
            {this.state.toggle ? (
              <Button
                onClick={this.toggleOff}
                variant="primary"
                block
                data-testid="btn-load-on"
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
                data-testid="btn-load-off"
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

export default LoadToggle;
