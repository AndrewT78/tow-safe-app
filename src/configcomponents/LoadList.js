import React, { Component } from 'react';
import LoadItem from "./LoadItem";

class LoadList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }


      getLoadItemRows () {
        return (
          this.props.load.map((prop, key) => {
            return <LoadItem key={key} item={prop}></LoadItem>;
          })
      );
      };


    render() {    
      return (<div style={{marginTop:'20px'}}> 
        {this.getLoadItemRows()}
      </div>);
      
    }    
}

export default LoadList;
