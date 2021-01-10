import React from 'react';

import {Form, Button, Col} from "react-bootstrap";



class AddLoad extends React.Component {

    constructor(props) {
        super(props);
        this.state = { quantity: 1};
      }

      updateItem = input => {      
        this.setState({ item: input});
      };

      updateWeight = input => {      
        this.setState({ weight: parseFloat(input)});
      };
  
      updateQuantity = input => {      
        this.setState({ quantity: parseInt(input)});
      };

      formComplete = () => {      
        return this.state.item && this.state.quantity > 0 && this.state.weight > 0;
      }
  
      handleSubmit = () => {
          this.props.handleLoad(this.state);
          this.setState({ item: null, weight: null, quantity: 1});
        };

  render() {
      return (
        <Form>
    <Form.Row>          
        <Col xs={5}>
      <Form.Control type="text" placeholder="Item Name" name="item" onChange={ e => this.updateItem(e.target.value)}/>
      </Col>
      <Col xs={2}>
      <Form.Control type="number" placeholder="kg" name="weight" onChange={ e => this.updateWeight(e.target.value)}/>
      </Col>
      <Col xs={2}>
      <Form.Control type="number" placeholder="Quantity" name="quantity" value={this.state.quantity}  onChange={ e => this.updateQuantity(e.target.value)}/>
      </Col>
      <Col>
      {this.formComplete() ? <Button onClick={e => this.handleSubmit()}>Add</Button> : <Button onClick={e => this.handleSubmit()} disabled>Add</Button>}  
      </Col>
    </Form.Row>   
    </Form>
      );
  }

}  

export default AddLoad;