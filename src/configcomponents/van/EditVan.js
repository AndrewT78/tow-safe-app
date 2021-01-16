import React from "react";
import { connect } from "react-redux";
import VanConfig from "./VanConfig";
import { getVanConfig } from "../../redux/selectors";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class EditVan extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div style={{ marginBottom: "10px", marginTop: "0px" }}>
          <Link
            to="/"
            data-testid="van-config-back"
            style={{ color: "inherit" }}
          >
            <Button>Back</Button>
          </Link>
        </div>
        <VanConfig></VanConfig>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  return { vanConfig };
};

export default connect(mapStateToProps)(EditVan);
