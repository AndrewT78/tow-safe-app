import React from "react";
import { connect } from "react-redux";
import CarConfig from "./CarConfig";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { getCarConfig } from "../../redux/selectors";
import { addCarAccessory } from "../../redux/actions";
import AccessoriesAdder from "../accessories/AccessoriesAdder";

class CarSetup extends React.Component {
  constructor(props) {
    super(props);
  }

  isCarConfigured = () => {
    return this.props.carConfig.tare > 0;
  };

  handleAddNewAccessory = (acc) => {
    this.props.addCarAccessory(acc);
  };

  carAccessories = [
    { name: "Bullbar", weight: 80 },
    { name: "Roofrack", weight: 12 },
  ];

  render() {
    return (
      <>
        {this.isCarConfigured() ? (
          <>
            <Alert variant="secondary">
              Nearly there, let's add some accessories to your vehicle
            </Alert>
            <AccessoriesAdder
              accessories={this.carAccessories}
              handleAdd={this.handleAddNewAccessory}
            ></AccessoriesAdder>
            <div style={{ marginTop: "20px" }}>
              <Link
                to="/"
                data-testid="car-config-back"
                style={{ color: "inherit" }}
              >
                <Button>Done</Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Alert variant="secondary">Now let's setup your tow vehicle</Alert>
            <CarConfig></CarConfig>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const carConfig = getCarConfig(state);
  return { carConfig };
};

export default connect(mapStateToProps, { addCarAccessory })(CarSetup);
