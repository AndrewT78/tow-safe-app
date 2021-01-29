import { Button, Form, Col, InputGroup } from "react-bootstrap";
import React from "react";
import AddLoad from "../AddLoad";

class LoadAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, weight: props.load[0].weight, hidden: [] };
  }

  handleAddNewLoad = (load) => {
    this.props.handleAdd(load);
  };

  markAsAdded = (key) => {
    var newHidden = this.state.hidden;
    newHidden.push(key);
    this.setState({ hidden: newHidden });
  };

  getSampleLoad() {
    return this.props.load.map((prop, key) => {
      if (this.state.hidden.indexOf(key) < 0) {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.item}>
            <AddLoad
              load={prop}
              handleLoad={(load) => {
                this.handleAddNewLoad(load);
                this.markAsAdded(key);
              }}
            ></AddLoad>
          </div>
        );
      } else {
        return <div key={prop.item}></div>;
      }
    });
  }

  render() {
    return <div style={{ marginTop: "20px" }}>{this.getSampleLoad()}</div>;
  }
}

export default LoadAdder;
