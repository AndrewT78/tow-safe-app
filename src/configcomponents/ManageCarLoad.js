import React, { Component } from 'react';

import {Form, Button, Col} from "react-bootstrap";

import { connect } from "react-redux";
import { addCarLoad } from "../redux/actions";
import AddLoad from './AddLoad';
import LoadList from "./LoadList";
import { getCarLoad } from "../redux/selectors";


class ManageCarLoad extends React.Component {

    constructor(props) {      
        super(props);        
      }       
  
      handleAddNewLoad = (load) => {
          this.props.addCarLoad(load);          
        };

  render() {
      return (
          <div>
        <AddLoad handleLoad={this.handleAddNewLoad}></AddLoad>      
        <LoadList load={this.props.carLoad}></LoadList>  
        </div>
      );
  }

}  

const mapStateToProps = state => {  
    const carLoad = getCarLoad(state);   
    return { carLoad };
  };

export default connect(
    mapStateToProps,
    { addCarLoad }
  )(ManageCarLoad);