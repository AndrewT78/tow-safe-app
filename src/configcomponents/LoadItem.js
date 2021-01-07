import React, { Component } from 'react';

class LoadItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
          return (
              <div>
          <div>{this.props.item.item}</div>
          <div>{this.props.item.quantity}</div>
          <div>{this.props.item.weight}</div>
          </div>
          );
      }
}

export default LoadItem;
