import React from "react";
import { connect } from "react-redux";
import VanConfig from "./VanConfig";

class EditVan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <VanConfig></VanConfig>;
  }
}

export default connect(null, {})(EditVan);
