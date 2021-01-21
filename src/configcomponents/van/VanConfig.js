import React from "react";

import { Form, Button, InputGroup } from "react-bootstrap";

import { connect } from "react-redux";
import { updateVanConfig } from "../../redux/actions";
import { getVanConfig } from "../../redux/selectors";

class VanConfig extends React.Component {
  constructor(props) {
    super(props);
    if (props.vanConfig) {
      this.state = {
        atm: props.vanConfig.atm,
        tare: props.vanConfig.tare,
        tbm: props.vanConfig.tbm,
      };
    } else {
      this.state = {};
    }
  }

  updateATM = (input) => {
    this.setState({ atm: parseInt(input) });
  };

  updateTare = (input) => {
    this.setState({ tare: parseInt(input) });
  };

  updateTBM = (input) => {
    this.setState({ tbm: parseInt(input) });
  };

  formComplete = () => {
    return (
      this.state.atm > 0 &&
      this.state.tbm > 0 &&
      this.state.tare > 0 &&
      (this.state.atm != this.props.vanConfig.atm ||
        this.state.tare != this.props.vanConfig.tare ||
        this.state.tbm != this.props.vanConfig.tbm)
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateVanConfig(this.state);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="vanConfigForm.atm">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>ATM</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              placeholder="ATM"
              value={this.state.atm}
              onChange={(e) => this.updateATM(e.target.value)}
              autoFocus={true}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="vanConfigForm.tare">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Tare</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              placeholder="Tare"
              value={this.state.tare}
              onChange={(e) => this.updateTare(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="vanConfigForm.tbm">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>TBM</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="number"
              placeholder="TBM"
              value={this.state.tbm}
              onChange={(e) => this.updateTBM(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
        <Button type="submit" disabled={!this.formComplete()}>
          Save
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  return { vanConfig };
};

export default connect(mapStateToProps, { updateVanConfig })(VanConfig);
