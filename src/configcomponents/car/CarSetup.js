import React from "react";
import { connect } from "react-redux";
import CarConfig from "./CarConfig";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { getCarConfig } from "../../redux/selectors";

class CarSetup extends React.Component {
  constructor(props) {
    super(props);
  }

  isCarConfigured = () => {
    return this.props.carConfig.tare > 0;
  };

  render() {
    return (
      <>
        <Alert variant="secondary">Now let's setup your tow vehicle</Alert>
        {this.isCarConfigured() ? (
          <Link
            to="/"
            data-testid="car-config-back"
            style={{ color: "inherit" }}
          >
            <Button>Skip</Button>
          </Link>
        ) : (
          <CarConfig></CarConfig>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const carConfig = getCarConfig(state);
  return { carConfig };
};

export default connect(mapStateToProps)(CarSetup);
