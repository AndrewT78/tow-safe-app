import React, { Component } from 'react';

import {Form, Button} from "react-bootstrap";


const VanConfig = (props) => {

    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
              formDataObj = Object.fromEntries(formData.entries())        
        props.onSubmit(formDataObj);
      }

  return (
    <Form onSubmit={onFormSubmit}>
    <Form.Group controlId="vanConfigForm.atm">          
      <Form.Control type="number" placeholder="ATM" name="atm"/>
    </Form.Group>
    <Form.Group controlId="vanConfigForm.tare">          
      <Form.Control type="number" placeholder="Tare" name="tare"/>
    </Form.Group>
    <Form.Group controlId="vanConfigForm.tbm">          
      <Form.Control type="number" placeholder="Ball Weight" name="tbm"/>
    </Form.Group>
    <Button type="submit">Next</Button>
    </Form>
  );

}  

export default VanConfig;