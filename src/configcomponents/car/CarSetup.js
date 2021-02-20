import React from "react";
import { connect } from "react-redux";
import CarConfig from "./CarConfig";
import { Link } from "react-router-dom";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { getCarConfig, getCarLoad } from "../../redux/selectors";
import {
  addCarAccessory,
  addCarLoad,
  deleteCarAccessory,
} from "../../redux/actions";
import AccessoriesAdder from "../accessories/AccessoriesAdder";
import LoadAdder from "../load/LoadAdder";

import carSetupWizard from "./CarSetupWizardTypes.json";

import { getCarAccessories } from "../../redux/selectors";
import { FaSearch } from "react-icons/fa";
class CarSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "accessories" };

    // turn on the ones which are already in the store
    this.carAccessories.forEach((acc) => {
      const matchingStoreAcc = this.props.carAccessories.find(
        (storeAcc) => storeAcc.id === acc.id
      );
      if (matchingStoreAcc) {
        acc.exists = true;
        acc.accessory = matchingStoreAcc.accessory;
        acc.weight = matchingStoreAcc.weight;
      }
    });

    this.carLoad.forEach((load) => {
      const matchingStoreLoad = this.props.carLoad.find(
        (storeLoad) => storeLoad.id === load.id
      );
      if (matchingStoreLoad) {
        load.exists = true;
        load.item = matchingStoreLoad.item;
        load.weight = matchingStoreLoad.weight;
        load.quantity = matchingStoreLoad.quantity;
      }
    });
  }

  isCarConfigured = () => {
    return this.props.carConfig.tare > 0;
  };

  handleAddNewAccessory = (acc) => {
    this.props.addCarAccessory(acc);
  };

  handleDeleteAccessory = (id) => {
    this.props.deleteCarAccessory(id);
  };

  handleAddNewLoad = (load) => {
    this.props.addCarLoad(load);
  };

  showLoad = () => {
    this.setState({ screen: "load" });
  };

  carAccessories = carSetupWizard.accessories;

  carLoad = carSetupWizard.load;

  render() {
    return (
      <>
        {this.isCarConfigured() ? (
          <>
            {this.state.screen === "load" ? (
              <>
                <Alert variant="info">
                  Now let's add some load to your car
                  <hr />
                  You can add your additional load or edit these later by
                  clicking on the car icon on the main screen
                </Alert>
                <LoadAdder
                  load={this.carLoad}
                  handleAdd={this.handleAddNewLoad}
                ></LoadAdder>
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
                  Nearly there, let's add some accessories to your vehicle
                  <hr />
                  You can add your own accessories or edit these later by
                  clicking on the car icon on the main screen
                </Alert>
                <AccessoriesAdder
                  accessories={this.carAccessories}
                  handleAdd={this.handleAddNewAccessory}
                  handleDelete={this.handleDeleteAccessory}
                ></AccessoriesAdder>
                <div style={{ marginTop: "20px" }}>
                  <Row>
                    <Col>
                      <Button onClick={this.showLoad} variant="outline-primary">
                        Next: Load
                      </Button>
                    </Col>
                    <Col>
                      <Link
                        to="/"
                        data-testid="car-config-back"
                        style={{ color: "inherit" }}
                      >
                        <Button>Done</Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <Alert variant="info">
              Now let's setup your tow vehicle
              <hr />
              You can find the details below on your car's compliance plate or
              consult your handbook or manufacturer's specifications
            </Alert>
            <Link
              to="/carselector"
              data-testid="car-selector-btn"
              style={{ color: "inherit" }}
            >
              <Button style={{ marginBottom: 10 }}>
                <FaSearch></FaSearch> Lookup Vehicle
              </Button>
            </Link>
            <CarConfig></CarConfig>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const carConfig = getCarConfig(state);
  const carAccessories = getCarAccessories(state);
  const carLoad = getCarLoad(state);
  return { carConfig, carAccessories, carLoad };
};

export default connect(mapStateToProps, {
  addCarAccessory,
  addCarLoad,
  deleteCarAccessory,
})(CarSetup);
