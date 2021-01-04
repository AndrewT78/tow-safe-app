import React, { Component } from 'react';

import {Form, Button} from "react-bootstrap";

import { connect } from "react-redux";
import { updateVanConfig } from "../redux/actions";


class VanConfig extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };
      }

    updateATM = input => {      
        this.setState({ atm: parseInt(input)});
    };

    handleSubmit = () => {
        this.props.updateVanConfig(this.state);
        this.setState({ atm: null});
      };

  render() {
      return (
    <Form>
    <Form.Group controlId="vanConfigForm.atm">          
      <Form.Control type="number" placeholder="ATM" name="atm" onChange={ e => this.updateATM(e.target.value)}/>
    </Form.Group>   
    <Button onClick={e => this.handleSubmit()}>Next</Button>
    </Form>
      );
  }
    
  

}  

export default connect(
    null,
    { updateVanConfig }
  )(VanConfig);