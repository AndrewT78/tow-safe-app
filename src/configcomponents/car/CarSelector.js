import React from "react";
import {
  Button,
  DropdownButton,
  Dropdown,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { connect } from "react-redux";
import CarSpecifications from "./CarSpecifications.json";
import { updateCarConfig } from "../../redux/actions";
import { Link } from "react-router-dom";

class CarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMakes() {
    var makes = [];
    return CarSpecifications.vehicles.map((v, key) => {
      if (makes.indexOf(v.make) < 0) {
        makes.push(v.make);
        return (
          <Dropdown.Item key={key} onSelect={() => this.setMake(v.make)}>
            {v.make}
          </Dropdown.Item>
        );
      }
    });
  }

  getModels() {
    var models = [];
    return CarSpecifications.vehicles
      .filter((v) => {
        return v.make === this.state.make;
      })
      .map((m, key) => {
        if (models.indexOf(m.model) < 0) {
          models.push(m.model);
          return (
            <Dropdown.Item key={key} onSelect={() => this.setModel(m.model)}>
              {m.model}
            </Dropdown.Item>
          );
        }
      });
  }

  getVariants() {
    return CarSpecifications.vehicles
      .filter((v) => {
        return v.make === this.state.make && v.model === this.state.model;
      })
      .map((m, key) => {
        return (
          <Dropdown.Item key={key} onSelect={() => this.setConfig(m)}>
            {m.variant}
          </Dropdown.Item>
        );
      });
  }

  setMake(make) {
    this.setState({ make, model: null, variant: null, vehicle: null });
  }

  setModel(model) {
    this.setState({ model, variant: null, vehicle: null });
  }

  setConfig(vehicle) {
    this.setState({ vehicle, variant: vehicle.variant });
  }

  render() {
    return (
      <>
        <Alert variant="info">
          Find your vehicle using the criteria below
          <hr />
          You can modify the details later by clicking on the car icon on the
          main screen
        </Alert>

        <Row>
          <Col>
            <DropdownButton
              block
              variant="outline-primary"
              title={this.state.make ?? "Make"}
            >
              {this.getMakes()}
            </DropdownButton>
          </Col>
          <Col>
            {this.state.make && (
              <DropdownButton
                block
                variant="outline-primary"
                title={this.state.model ?? "Model"}
              >
                {this.getModels()}
              </DropdownButton>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            {this.state.model && (
              <DropdownButton
                variant="outline-primary"
                title={this.state.variant ?? "Variant"}
              >
                {this.getVariants()}
              </DropdownButton>
            )}
          </Col>
          <Col></Col>
        </Row>
        {this.state.vehicle && (
          <Row style={{ marginTop: 10 }}>
            <Col>Tare: {this.state.vehicle.tare}</Col>
            <Col>GVM: {this.state.vehicle.gvm}</Col>
            <Col>GCM: {this.state.vehicle.gcm}</Col>
          </Row>
        )}
        <Row style={{ marginTop: 10 }}>
          <Col>
            {this.state.vehicle && (
              <Link
                to="/carsetup"
                data-testid="car-selector-apply"
                style={{ color: "inherit" }}
              >
                <Button
                  onClick={() =>
                    this.props.updateCarConfig({
                      tare: this.state.vehicle.tare,
                      gvm: this.state.vehicle.gvm,
                      gcm: this.state.vehicle.gcm,
                    })
                  }
                >
                  Apply
                </Button>
              </Link>
            )}
          </Col>
          <Col></Col>
          <Col>
            <Link
              to="/"
              data-testid="car-selector-cancel"
              style={{ color: "inherit" }}
            >
              <Button variant="outline-primary">Cancel</Button>
            </Link>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { updateCarConfig })(CarSelector);
