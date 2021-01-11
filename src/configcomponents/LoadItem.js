import React from "react";
import { Alert, Row, Col } from "react-bootstrap";
import { FaToggleOn, FaToggleOff, FaTrash } from "react-icons/fa";

class LoadItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Alert variant="secondary">
        <Row>
          <Col>{this.props.item.item}</Col>
        </Row>
        <Row>
          <Col>
            {this.props.item.quantity * this.props.item.weight} kgs (
            {this.props.item.quantity}x{this.props.item.weight} kg)
          </Col>
          <Col xs={"auto"}>
            {this.props.item.enabled ? (
              <FaToggleOn
                onClick={() => {}}
                size="25"
                data-testid={`enabled-toggle-load-${this.props.item.id}`}
              ></FaToggleOn>
            ) : (
              <FaToggleOff
                onClick={() => {}}
                size="25"
                data-testid={`disabled-toggle-load-${this.props.item.id}`}
              ></FaToggleOff>
            )}
          </Col>
          <Col xs={"auto"}>
            <FaTrash
              onClick={() => {
                this.props.handleDelete(this.props.item.id);
              }}
              size="25"
              data-testid={`delete-load-${this.props.item.id}`}
            ></FaTrash>
          </Col>
        </Row>
      </Alert>
    );
  }
}

export default LoadItem;
