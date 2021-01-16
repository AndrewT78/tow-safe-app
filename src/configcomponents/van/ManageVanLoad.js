import React from "react";

import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import {
  addVanLoad,
  deleteVanLoad,
  toggleVanLoad,
  moveLoadToCar,
} from "../../redux/actions";
import AddLoad from "../AddLoad";
import LoadList from "../LoadList";
import { getVanLoad } from "../../redux/selectors";
import SummaryStatus from "../../indicatorcomponents/SummaryStatus";
import { FaTruckPickup } from "react-icons/fa";

class ManageVanLoad extends React.Component {
  handleAddNewLoad = (load) => {
    this.props.addVanLoad(load);
  };

  handleDeleteLoad = (id) => {
    this.props.deleteVanLoad(id);
  };

  handleToggleLoad = (id) => {
    this.props.toggleVanLoad(id);
  };

  handleMoveLoad = (id) => {
    this.props.moveLoadToCar(id);
  };

  render() {
    return (
      <div>
        <SummaryStatus></SummaryStatus>
        <div style={{ marginBottom: "10px", marginTop: "0px" }}>
          <Link to="/" data-testid="van-load-back" style={{ color: "inherit" }}>
            <Button>Back</Button>
          </Link>
        </div>
        <div style={{ marginBottom: "10px" }}>Manage your van payload</div>
        <AddLoad handleLoad={this.handleAddNewLoad}></AddLoad>
        <LoadList
          load={this.props.vanLoad}
          handleDelete={this.handleDeleteLoad}
          handleToggle={this.handleToggleLoad}
          handleMove={this.handleMoveLoad}
          moveIcon={<FaTruckPickup size="25" />}
        ></LoadList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const vanLoad = getVanLoad(state);
  return { vanLoad };
};

export default connect(mapStateToProps, {
  addVanLoad,
  deleteVanLoad,
  toggleVanLoad,
  moveLoadToCar,
})(ManageVanLoad);
