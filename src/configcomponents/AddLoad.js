import React, { useState } from "react";

import { Form, Button, Col, InputGroup, Row } from "react-bootstrap";

class AddLoad extends React.Component {
  constructor(props) {
    super(props);
    if (props.load) {
      this.state = {
        quantity: props.load.quantity,
        item: props.load.item,
        weight: props.load.weight,
      };
    } else {
      this.state = { quantity: undefined, item: "", weight: undefined };
    }
  }

  updateItem = (input) => {
    this.setState({ item: input });
  };

  updateWeight = (input) => {
    this.setState({ weight: parseFloat(input) });
  };

  updateQuantity = (input) => {
    this.setState({ quantity: parseInt(input) });
  };

  formComplete = () => {
    return this.state.item && this.state.quantity > 0 && this.state.weight > 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLoad(this.state);
    this.setState({ item: "", weight: 1, quantity: 1 });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Item Name"
              onChange={(e) => this.updateItem(e.target.value)}
              value={this.state.item}
              autoFocus={true}
              onFocus={(e) => e.target.select()}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              placeholder="kg"
              value={this.state.weight}
              onChange={(e) => this.updateWeight(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              placeholder="x1"
              value={this.state.quantity}
              onChange={(e) => this.updateQuantity(e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          </Col>
          <Col xs={3}>
            <Button
              style={{ width: "100%" }}
              type="submit"
              disabled={!this.formComplete()}
            >
              Add
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default AddLoad;
