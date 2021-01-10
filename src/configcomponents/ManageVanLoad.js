import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { addVanLoad, deleteVanLoad } from "../redux/actions";
import AddLoad from "./AddLoad";
import LoadList from "./LoadList";
import { getVanLoad } from "../redux/selectors";

class ManageVanLoad extends React.Component {
  handleAddNewLoad = (load) => {
    this.props.addVanLoad(load);
  };

  handleDeleteLoad = (id) => {
    this.props.deleteVanLoad(id);
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: "20px" }}>
          <Link to="/" data-testid="van-load-back" style={{ color: "inherit" }}>
            <Button>Back</Button>
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>Manage your van payload</div>
        <AddLoad handleLoad={this.handleAddNewLoad}></AddLoad>
        <LoadList
          load={this.props.vanLoad}
          handleDelete={this.handleDeleteLoad}
        ></LoadList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const vanLoad = getVanLoad(state);
  return { vanLoad };
};

export default connect(mapStateToProps, { addVanLoad, deleteVanLoad })(
  ManageVanLoad
);
