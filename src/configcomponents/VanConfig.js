import React from 'react';

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

    updateTare = input => {      
      this.setState({ tare: parseInt(input)});
    };

    updateTBM = input => {      
      this.setState({ tbm: parseInt(input)});
    };

    formComplete = () => {      
      return this.state.atm > 0 && this.state.tbm > 0 && this.state.tare > 0;
    }

    handleSubmit = () => {
        this.props.updateVanConfig(this.state);
        this.setState({ atm: null, tbm: null, tare: null});
      };

  render() {
      return (
    <Form>
    <Form.Group controlId="vanConfigForm.atm">          
      <Form.Control type="number" placeholder="ATM" name="atm" onChange={ e => this.updateATM(e.target.value)}/>
    </Form.Group>   
    <Form.Group controlId="vanConfigForm.tare">          
      <Form.Control type="number" placeholder="Tare" name="tare" onChange={ e => this.updateTare(e.target.value)}/>
    </Form.Group>   
    <Form.Group controlId="vanConfigForm.tbm">          
      <Form.Control type="number" placeholder="TBM" name="tbm" onChange={ e => this.updateTBM(e.target.value)}/>
    </Form.Group>   
    {this.formComplete() ? <Button onClick={e => this.handleSubmit()}>Next</Button> : <Button onClick={e => this.handleSubmit()} disabled>Next</Button>}
    
    </Form>
      );
  }
    
  

}  

export default connect(
    null,
    { updateVanConfig }
  )(VanConfig);