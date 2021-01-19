import React, { useState } from "react";

import { Form, Button, Col, InputGroup } from "react-bootstrap";

class AddAccessory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accessory: "", weight: 1.0 };
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
    this.setState({ item: "", weight: 1 });
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
          <Col xs={2}>
            {this.formComplete() ? (
              <Button style={{ width: "100%" }} type="submit">
                Add
              </Button>
            ) : (
              <Button style={{ width: "100%" }} type="submit" disabled>
                Add
              </Button>
            )}
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default AddAccessory;
