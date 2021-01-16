import React from "react";

import { Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { updateCarConfig } from "../../redux/actions";
import { getCarConfig } from "../../redux/selectors";

class CarConfig extends React.Component {
  constructor(props) {
    super(props);
    if (props.carConfig) {
      this.state = {
        gvm: props.carConfig.gvm,
        tare: props.carConfig.tare,
        gcm: props.carConfig.gcm,
      };
    } else {
      this.state = {};
    }
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
    return (
      this.state.gvm > 0 &&
      this.state.gcm > 0 &&
      this.state.tare > 0 &&
      (this.state.gvm != this.props.carConfig.gvm ||
        this.state.gcm != this.props.carConfig.gcm ||
        this.state.tare != this.props.carConfig.tare)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateCarConfig(this.state);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="carConfigForm.atm">
          <Form.Control
            type="number"
            placeholder="GVM"
            value={this.state.gvm}
            onChange={(e) => this.updateGVM(e.target.value)}
            autoFocus={true}
          />
        </Form.Group>
        <Form.Group controlId="carConfigForm.tare">
          <Form.Control
            type="number"
            placeholder="Tare"
            value={this.state.tare}
            onChange={(e) => this.updateTare(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="carConfigForm.gcm">
          <Form.Control
            type="number"
            placeholder="GCM"
            value={this.state.gcm}
            onChange={(e) => this.updateGCM(e.target.value)}
          />
        </Form.Group>
        {this.formComplete() ? (
          <Button type="submit">Save</Button>
        ) : (
          <Button type="submit" disabled>
            Save
          </Button>
        )}
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const carConfig = getCarConfig(state);
  return { carConfig };
};

export default connect(mapStateToProps, { updateCarConfig })(CarConfig);
