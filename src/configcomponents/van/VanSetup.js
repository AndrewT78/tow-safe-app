import React from "react";
import { connect } from "react-redux";
import VanConfig from "./VanConfig";
import { Link } from "react-router-dom";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { getVanConfig, getVanLoad } from "./../../redux/selectors";
import AccessoriesAdder from "../accessories/AccessoriesAdder";
import LoadAdder from "../load/LoadAdder";
import {
  addVanAccessory,
  addVanLoad,
  deleteVanAccessory,
} from "../../redux/actions";

import { getVanAccessories } from "../../redux/selectors";

import vanSetupWizard from "./VanSetupWizardTypes.json";

class VanSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "accessories" };

    // turn on the ones which are already in the store
    this.vanAccessories.forEach((acc) => {
      const matchingStoreAcc = this.props.vanAccessories.find(
        (storeAcc) => storeAcc.id === acc.id
      );
      if (matchingStoreAcc) {
        acc.exists = true;
        acc.accessory = matchingStoreAcc.accessory;
        acc.weight = matchingStoreAcc.weight;
      }
    });

    this.vanLoad.forEach((load) => {
      const matchingStoreLoad = this.props.vanLoad.find(
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

  isVanConfigured = () => {
    return this.props.vanConfig.tare > 0;
  };

  handleAddNewAccessory = (acc) => {
    this.props.addVanAccessory(acc);
  };

  handleDeleteAccessory = (id) => {
    this.props.deleteVanAccessory(id);
  };

  handleAddNewLoad = (load) => {
    this.props.addVanLoad(load);
  };

  showLoad = () => {
    this.setState({ screen: "load" });
  };

  vanAccessories = vanSetupWizard.accessories;

  vanLoad = vanSetupWizard.load;

  render() {
    return (
      <>
        {this.isVanConfigured() ? (
          <>
            {this.state.screen === "load" ? (
              <>
                <Alert variant="info">
                  Now let's add some load to your van
                  <hr />
                  You can add your additional load or edit these later by
                  clicking on the caravan icon on the main screen
                </Alert>
                <LoadAdder
                  load={this.vanLoad}
                  handleAdd={this.handleAddNewLoad}
                ></LoadAdder>
                <div style={{ marginTop: "20px" }}>
                  <Link
                    to="/"
                    data-testid="van-config-back"
                    style={{ color: "inherit" }}
                  >
                    <Button>Done</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Alert variant="info">
                  Now let's add some accessories to your van
                  <hr />
                  You can add your own accessories or edit these later by
                  clicking on the caravan icon on the main screen
                </Alert>
                <AccessoriesAdder
                  accessories={this.vanAccessories}
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
                        data-testid="van-config-back"
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
              Welcome to TowSafe - Let's start by setting up your van details
              <hr />
              You can find the details below on your van compliance plate, or as
              provided by the manufacturer
            </Alert>
            <VanConfig></VanConfig>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  const vanAccessories = getVanAccessories(state);
  const vanLoad = getVanLoad(state);
  return { vanConfig, vanAccessories, vanLoad };
};

export default connect(mapStateToProps, {
  addVanAccessory,
  addVanLoad,
  deleteVanAccessory,
})(VanSetup);
