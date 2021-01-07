import React, { Component } from 'react';
import LoadItem from "./LoadItem";

class LoadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }


    render() {
      return (
          this.props.load.map((prop, key) => {
            return <LoadItem key={key} item={prop}></LoadItem>;
          })
      );
    }
}

export default LoadList;
