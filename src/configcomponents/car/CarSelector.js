import React from "react";
import { Button, DropdownButton, Dropdown } from "react-bootstrap";
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
    this.setState({ make, model: null, variant: null });
  }

  setModel(model) {
    this.setState({ model });
  }

  setConfig(vehicle) {
    this.setState({ vehicle });
  }

  render() {
    return (
      <>
        <DropdownButton title="Make">{this.getMakes()}</DropdownButton>
        {this.state.make && (
          <DropdownButton title="Model">{this.getModels()}</DropdownButton>
        )}
        {this.state.model && (
          <DropdownButton title="Variant">{this.getVariants()}</DropdownButton>
        )}
        {this.state.vehicle && (
          <>
            <div>{this.state.vehicle.tare}</div>
            <div>{this.state.vehicle.gvm}</div>
            <div>{this.state.vehicle.gcm}</div>
            <div>
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
            </div>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { updateCarConfig })(CarSelector);
