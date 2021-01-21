import React from "react";
import { connect } from "react-redux";
import VanConfig from "./VanConfig";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { getVanConfig } from "./../../redux/selectors";

class VanSetup extends React.Component {
  constructor(props) {
    super(props);
  }

  isVanConfigured = () => {
    return this.props.vanConfig.tare > 0;
  };

  render() {
    return (
      <>
        <Alert variant="secondary">
          Welcome to TowSafe, Let's start by setting up your van details
        </Alert>
        {this.isVanConfigured() ? (
          <Link
            to="/"
            data-testid="van-config-back"
            style={{ color: "inherit" }}
          >
            <Button>Skip</Button>
          </Link>
        ) : (
          <VanConfig></VanConfig>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  return { vanConfig };
};

export default connect(mapStateToProps)(VanSetup);
