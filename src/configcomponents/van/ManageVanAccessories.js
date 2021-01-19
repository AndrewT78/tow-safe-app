import React from "react";

import { connect } from "react-redux";
import { addVanAccessory, deleteVanAccessory } from "../../redux/actions";
import AddAccessory from "../accessories/AddAccessory";
import AccessoryList from "../accessories/AccessoryList";
import { getVanAccessories } from "../../redux/selectors";

class ManageVanAccessories extends React.Component {
  handleAddNewAccessory = (acc) => {
    this.props.addVanAccessory(acc);
  };

  handleDeleteAccessory = (id) => {
    this.props.deleteVanAccessory(id);
  };

  render() {
    return (
      <div>
        <AddAccessory
          handleAccessory={this.handleAddNewAccessory}
        ></AddAccessory>
        <AccessoryList
          accessories={this.props.vanAccessories}
          handleDelete={this.handleDeleteAccessory}
        ></AccessoryList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const vanAccessories = getVanAccessories(state);
  return { vanAccessories };
};

export default connect(mapStateToProps, {
  addVanAccessory,
  deleteVanAccessory,
})(ManageVanAccessories);
