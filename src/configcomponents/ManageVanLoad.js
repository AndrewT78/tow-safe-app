import React, { Component } from 'react';

import {Button} from "react-bootstrap";
import {    
  Link
} from "react-router-dom";

import { connect } from "react-redux";
import { addVanLoad } from "../redux/actions";
import AddLoad from './AddLoad';
import LoadList from "./LoadList";
import { getVanLoad } from "../redux/selectors";


class ManageVanLoad extends React.Component {

    constructor(props) {      
        super(props);        
      }       
  
      handleAddNewLoad = (load) => {
          this.props.addVanLoad(load);          
        };

  render() {
      return (
          <div>          
            <div><Link to="/" data-testid="van-load-back" style={{ color: "inherit"}}><Button>Back</Button></Link></div>  
            <AddLoad handleLoad={this.handleAddNewLoad}></AddLoad>
            <LoadList load={this.props.vanLoad}></LoadList>
        </div>
      );
  }

}  

const mapStateToProps = state => {  
    const vanLoad = getVanLoad(state);   
    return { vanLoad };
  };

export default connect(
    mapStateToProps,
    { addVanLoad }
  )(ManageVanLoad);