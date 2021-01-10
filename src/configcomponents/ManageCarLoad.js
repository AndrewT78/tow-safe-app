import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addCarLoad, deleteCarLoad } from "../redux/actions";
import AddLoad from "./AddLoad";
import LoadList from "./LoadList";
import { getCarLoad } from "../redux/selectors";

class ManageCarLoad extends React.Component {
  handleAddNewLoad = (load) => {
    this.props.addCarLoad(load);
  };

  handleDeleteLoad = (id) => {
    this.props.deleteCarLoad(id);
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Link to="/" data-testid="car-load-back" style={{ color: "inherit" }}>
            <Button>Back</Button>
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>Manage your car payload</div>
        <AddLoad handleLoad={this.handleAddNewLoad}></AddLoad>
        <LoadList
          load={this.props.carLoad}
          handleDelete={this.handleDeleteLoad}
        ></LoadList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const carLoad = getCarLoad(state);
  return { carLoad };
};

export default connect(mapStateToProps, { addCarLoad, deleteCarLoad })(
  ManageCarLoad
);
