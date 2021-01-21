import { Button, Form, Col, InputGroup } from "react-bootstrap";
import React from "react";

class AccessoriesAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0, weight: props.accessories[0].weight };
  }

  updateWeight = (input) => {
    this.setState({ weight: parseFloat(input) });
  };

  isWeightInvalid = () => {
    return !this.state.weight > 0;
  };

  moveNext = () => {
    if (this.state.index <= this.props.accessories.length - 2) {
      this.setState({
        index: ++this.state.index,
        weight: this.props.accessories[this.state.index].weight,
      });
    } else {
      this.setState({
        index: ++this.state.index,
      });
    }
  };

  getAccessory(index) {
    return (
      <Form>
        <Form.Row>
          <Form.Label column xs="4">
            {this.props.accessories[index].name}
          </Form.Label>

          <Col xs={4}>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="kg"
                value={this.state.weight}
                onChange={(e) => this.updateWeight(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text>kg</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={2}>
            <Button
              disabled={this.isWeightInvalid()}
              onClick={() => {
                this.props.handleAdd({
                  accessory: this.props.accessories[this.state.index].name,
                  weight: this.state.weight,
                });
                this.moveNext();
              }}
            >
              Add
            </Button>
          </Col>
          <Col xs={2}>
            <Button onClick={this.moveNext}>Skip</Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        {this.state.index < this.props.accessories.length ? (
          <>{this.getAccessory(this.state.index)}</>
        ) : (
          <>You have completed adding accessories, select 'Done' to continue</>
        )}
      </div>
    );
  }
}

export default AccessoriesAdder;
