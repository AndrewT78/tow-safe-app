import React from "react";
import { connect } from "react-redux";
import VanConfig from "./VanConfig";
import { Link } from "react-router-dom";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { getVanConfig } from "./../../redux/selectors";
import AccessoriesAdder from "../accessories/AccessoriesAdder";
import LoadAdder from "../load/LoadAdder";
import { addVanAccessory, addVanLoad } from "../../redux/actions";

class VanSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: "accessories" };
  }

  isVanConfigured = () => {
    return this.props.vanConfig.tare > 0;
  };

  handleAddNewAccessory = (acc) => {
    this.props.addVanAccessory(acc);
  };

  handleAddNewLoad = (load) => {
    this.props.addVanLoad(load);
  };

  showLoad = () => {
    this.setState({ screen: "load" });
  };

  vanAccessories = [
    { accessory: "Gas Bottle(s)", weight: 18 },
    { accessory: "Annex", weight: 30 },
  ];

  vanLoad = [
    { item: "Case", weight: 20, quantity: 2 },
    { item: "Sleeping Bags", weight: 2, quantity: 2 },
  ];

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
  return { vanConfig };
};

export default connect(mapStateToProps, { addVanAccessory, addVanLoad })(
  VanSetup
);
