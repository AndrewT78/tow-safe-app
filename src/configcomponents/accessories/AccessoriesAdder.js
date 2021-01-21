import { Button } from "react-bootstrap";
import React from "react";

class AccessoriesAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  getAccessory(index) {
    return <div>{this.props.accessories[index].name}</div>;
  }

  render() {
    return (
      <div style={{ marginTop: "20px" }}>
        {this.state.index < this.props.accessories.length ? (
          <>
            {this.getAccessory(this.state.index)}
            {this.state.index < this.props.accessories.length - 1 ? (
              <Button
                onClick={() => {
                  this.setState({ index: ++this.state.index });
                }}
              >
                Next
              </Button>
            ) : (
              <></>
            )}

            <Button
              onClick={() => {
                this.props.handleAdd({
                  accessory: this.props.accessories[this.state.index].name,
                  weight: this.props.accessories[this.state.index].weight,
                });
                this.setState({ index: ++this.state.index });
              }}
            >
              Add
            </Button>
          </>
        ) : (
          <>You have completed adding accessories, select 'Skip' to continue</>
        )}
      </div>
    );
  }
}

export default AccessoriesAdder;
