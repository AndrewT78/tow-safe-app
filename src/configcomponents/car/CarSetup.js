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
    { name: "Towbar", weight: 20 },
    { name: "Snorkel", weight: 5 },
  ];

  render() {
    return (
      <>
        {this.isCarConfigured() ? (
          <>
            <Alert variant="info">
              Nearly there, let's add some accessories to your vehicle
              <hr />
              You can add your own accessories or edit these later by clicking
              on the car icon on the main screen
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
            <Alert variant="info">
              Now let's setup your tow vehicle
              <hr />
              You can find the details below on your car's compliance plate or
              consult your handbook or manufacturer's specifications
            </Alert>
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
