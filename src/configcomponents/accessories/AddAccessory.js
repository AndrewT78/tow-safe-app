import React, { useState } from "react";

import { Form, Button, Col, InputGroup } from "react-bootstrap";

class AddAccessory extends React.Component {
  constructor(props) {
    super(props);

    if (props.accessory) {
      this.state = {
        accessory: props.accessory.accessory,
        weight: props.accessory.weight,
      };
    } else {
      this.state = { accessory: "", weight: undefined };
    }
  }

  updateAccessory = (input) => {
    this.setState({ accessory: input });
  };

  updateWeight = (input) => {
    this.setState({ weight: parseFloat(input) });
  };

  formComplete = () => {
    return this.state.accessory && this.state.weight > 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleAccessory(this.state);
    this.setState({ item: "", weight: undefined });
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

export default AddAccessory;
