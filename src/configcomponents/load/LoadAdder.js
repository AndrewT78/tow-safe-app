import { Button, Form, Col, Row, InputGroup } from "react-bootstrap";
import React from "react";
import LoadToggle from "./LoadToggle";

class LoadAdder extends React.Component {
  handleAddNewLoad = (load) => {
    this.props.handleAdd(load);
  };

  handleDeleteLoad = (id) => {
    this.props.handleDelete(id);
  };

  getSampleLoad() {
    return this.props.load.map((prop, key) => {
      if (!prop.exists) {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.id}>
            <LoadToggle
              load={prop}
              handleAddLoad={(load) => {
                this.handleAddNewLoad(load);
              }}
              handleDeleteLoad={(id) => {
                this.handleDeleteLoad(id);
              }}
            ></LoadToggle>
          </div>
        );
      } else {
        return (
          <div style={{ marginBottom: "20px" }} key={prop.id}>
            <LoadToggle
              load={prop}
              handleAddLoad={(load) => {
                this.handleAddNewLoad(load);
              }}
              handleDeleteLoad={(id) => {
                this.handleDeleteLoad(id);
              }}
              toggle={true}
            ></LoadToggle>
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <Row style={{ marginBottom: 5 }}>
          <Col style={{ paddingLeft: 20 }}>Item Name</Col>
          <Col style={{ paddingLeft: 20 }} xs={2}>
            kg
          </Col>
          <Col style={{ paddingLeft: 20 }} xs={2}>
            x
          </Col>
          <Col xs={3}></Col>
        </Row>
        {this.getSampleLoad()}
      </div>
    );
  }
}

export default LoadAdder;
