import React, { useState } from "react";

import { Form, Button, Col, InputGroup } from "react-bootstrap";

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
          <Col>
            <Form.Control
              type="text"
              placeholder="Item Name"
              onChange={(e) => this.updateItem(e.target.value)}
              value={this.state.item}
              autoFocus={true}
            />
          </Col>
          <Col xs={4}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="kg"
                value={this.state.weight}
                onChange={(e) => this.updateWeight(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>kg</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={3}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>x</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={this.state.quantity}
                onChange={(e) => this.updateQuantity(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Form.Row>
        <Form.Row
          style={{ marginTop: "20px", marginLeft: "0px", marginRight: "0px" }}
        >
          {this.formComplete() ? (
            <Button style={{ width: "100%" }} type="submit">
              Add
            </Button>
          ) : (
            <Button style={{ width: "100%" }} type="submit" disabled>
              Add
            </Button>
          )}
        </Form.Row>
      </Form>
    );
  }
}

export default AddLoad;
