import React from "react";

import { connect } from "react-redux";
import { addCarAccessory, deleteCarAccessory } from "../../redux/actions";
import AddAccessory from "../accessories/AddAccessory";
import AccessoryList from "../accessories/AccessoryList";
import { getCarAccessories } from "../../redux/selectors";

class ManageCarAccessories extends React.Component {
  handleAddNewAccessory = (acc) => {
    this.props.addCarAccessory(acc);
  };

  handleDeleteAccessory = (id) => {
    this.props.deleteCarAccessory(id);
  };

  render() {
    return (
      <div>
        <AddAccessory
          handleAccessory={this.handleAddNewAccessory}
        ></AddAccessory>
        <AccessoryList
          accessories={this.props.carAccessories}
          handleDelete={this.handleDeleteAccessory}
        ></AccessoryList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const carAccessories = getCarAccessories(state);
  return { carAccessories };
};

export default connect(mapStateToProps, {
  addCarAccessory,
  deleteCarAccessory,
})(ManageCarAccessories);
