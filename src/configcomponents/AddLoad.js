import React, { useState } from "react";

import { Form, Button, Col } from "react-bootstrap";

class AddLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1, item: "", weight: 1.0 };
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
          <Col xs={5}>
            <Form.Control
              type="text"
              placeholder="Item Name"
              onChange={(e) => this.updateItem(e.target.value)}
              value={this.state.item}
              autoFocus={true}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              placeholder="kg"
              value={this.state.weight}
              onChange={(e) => this.updateWeight(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              type="number"
              placeholder="Quantity"
              value={this.state.quantity}
              onChange={(e) => this.updateQuantity(e.target.value)}
            />
          </Col>
          <Col>
            {this.formComplete() ? (
              <Button type="submit">Add</Button>
            ) : (
              <Button type="submit" disabled>
                Add
              </Button>
            )}
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default AddLoad;
