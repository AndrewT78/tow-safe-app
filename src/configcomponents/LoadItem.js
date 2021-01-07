import React, { Component } from 'react';
import { Alert, Row, Col } from "react-bootstrap";

class LoadItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
      }

      render() {
          return (
              <Alert variant="secondary">
                <Row>
                  <Col>{this.props.item.item}</Col>                                    
                </Row>
                <Row>
                  <Col xs={'auto'}>{this.props.item.quantity * this.props.item.weight} kgs ({this.props.item.quantity}x{this.props.item.weight} kg)</Col>
                </Row>
              </Alert>          
          );
      }
}

export default LoadItem;
