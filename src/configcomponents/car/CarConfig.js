import React from "react";

import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { updateCarConfig } from "../../redux/actions";

class CarConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateGVM = (input) => {
    this.setState({ gvm: parseInt(input) });
  };

  updateTare = (input) => {
    this.setState({ tare: parseInt(input) });
  };

  updateGCM = (input) => {
    this.setState({ gcm: parseInt(input) });
  };

  formComplete = () => {
    return this.state.gvm > 0 && this.state.gcm > 0 && this.state.tare > 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateCarConfig(this.state);
    this.setState({ gvm: null, gcm: null, tare: null });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="carConfigForm.atm">
          <Form.Control
            type="number"
            placeholder="GVM"
            name="gvm"
            onChange={(e) => this.updateGVM(e.target.value)}
            autoFocus={true}
          />
        </Form.Group>
        <Form.Group controlId="carConfigForm.tare">
          <Form.Control
            type="number"
            placeholder="Tare"
            name="tare"
            onChange={(e) => this.updateTare(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="carConfigForm.gcm">
          <Form.Control
            type="number"
            placeholder="GCM"
            name="gcm"
            onChange={(e) => this.updateGCM(e.target.value)}
          />
        </Form.Group>
        {this.formComplete() ? (
          <Button type="submit">Next</Button>
        ) : (
          <Button type="submit" disabled>
            Next
          </Button>
        )}
      </Form>
    );
  }
}

export default connect(null, { updateCarConfig })(CarConfig);
