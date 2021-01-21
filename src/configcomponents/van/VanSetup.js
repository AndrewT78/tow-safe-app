import React from "react";
import { connect } from "react-redux";
import VanConfig from "./VanConfig";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { getVanConfig } from "./../../redux/selectors";
import AccessoriesAdder from "../accessories/AccessoriesAdder";
import { addVanAccessory } from "../../redux/actions";

class VanSetup extends React.Component {
  constructor(props) {
    super(props);
  }

  isVanConfigured = () => {
    return this.props.vanConfig.tare > 0;
  };

  handleAddNewAccessory = (acc) => {
    this.props.addVanAccessory(acc);
  };

  vanAccessories = [
    { name: "Gas Bottle(s)", weight: 18 },
    { name: "Annex", weight: 30 },
  ];

  render() {
    return (
      <>
        {this.isVanConfigured() ? (
          <>
            <Alert variant="secondary">
              Now let's add some accessories to your van
            </Alert>
            <AccessoriesAdder
              accessories={this.vanAccessories}
              handleAdd={this.handleAddNewAccessory}
            ></AccessoriesAdder>

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
            <Alert variant="secondary">
              Welcome to TowSafe, Let's start by setting up your van details
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

export default connect(mapStateToProps, { addVanAccessory })(VanSetup);
