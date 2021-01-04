import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";

import VanConfig from "./configcomponents/VanConfig"
import CarConfig from "./configcomponents/CarConfig"
import { getVanConfig } from "./redux/selectors";
import { getCarConfig } from "./redux/selectors";


const App = ({ vanConfig, carConfig }) => {
  return (
   
    <div>
    <Container>               
          {vanConfig && carConfig? <div>ATM : {vanConfig.atm}</div> : 
            vanConfig ? <CarConfig></CarConfig> : <div>Welcome to TowSafe, Let's get setup shall we<VanConfig></VanConfig></div>
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