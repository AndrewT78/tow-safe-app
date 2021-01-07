import React, { Component } from 'react';

import {Form, Button, Col} from "react-bootstrap";

import { connect } from "react-redux";
import { addCarLoad } from "../redux/actions";
import AddLoad from './AddLoad';


class ManageCarLoad extends React.Component {

    constructor(props) {
        super(props);        
      }       
  
      handleAddNewLoad = (load) => {
          this.props.addCarLoad(load);          
        };

  render() {
      return (
        <AddLoad handleLoad={this.handleAddNewLoad}></AddLoad>
      );
  }

}  

export default connect(
    null,
    { addCarLoad }
  )(ManageCarLoad);