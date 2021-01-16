import React from "react";
import { connect } from "react-redux";
import CarConfig from "./CarConfig";
import { getCarConfig } from "../../redux/selectors";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class EditCar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div style={{ marginBottom: "10px", marginTop: "0px" }}>
          <Link
            to="/"
            data-testid="car-config-back"
            style={{ color: "inherit" }}
          >
            <Button>Back</Button>
          </Link>
        </div>
        <CarConfig></CarConfig>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const carConfig = getCarConfig(state);
  return { carConfig };
};

export default connect(mapStateToProps)(EditCar);
