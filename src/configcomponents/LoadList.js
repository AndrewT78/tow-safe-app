import React from "react";
import LoadItem from "./LoadItem";

class LoadList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getLoadItemRows() {
    return this.props.load.map((prop, key) => {
      return (
        <LoadItem
          key={key}
          item={prop}
          handleDelete={this.props.handleDelete}
          handleToggle={this.props.handleToggle}
          handleMove={this.props.handleMove}
        ></LoadItem>
      );
    });
  }

  render() {
    return <div style={{ marginTop: "20px" }}>{this.getLoadItemRows()}</div>;
  }
}

export default LoadList;
