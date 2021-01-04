import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Alert, Row } from 'react-bootstrap';
import { connect } from "react-redux";

import VanConfig from "./configcomponents/VanConfig"
import CarConfig from "./configcomponents/CarConfig"
import { getVanConfig } from "./redux/selectors";
import { getCarConfig } from "./redux/selectors";



const getVanConfigPane = () => {
  return (<div><Alert variant="light">Welcome to TowSafe, Let's start by setting up your van details</Alert><VanConfig></VanConfig></div>);
}

const getCarConfigPane = () => {
  return (<div><Alert variant="light">Now let's setup your tow vehicle</Alert><CarConfig></CarConfig></div>);
}

const App = ({ vanConfig, carConfig }) => {
  
  return (
   
    <div>
    <Container>               
          {vanConfig && carConfig? <div>ATM : {vanConfig.atm}</div> : 
            vanConfig ? getCarConfigPane() : getVanConfigPane()
          }
    </Container>
    </div>
  );
}

const mapStateToProps = state => {  
  const vanConfig = getVanConfig(state);
  const carConfig = getCarConfig(state);
  return { vanConfig, carConfig };
};

export default connect(mapStateToProps)(App);