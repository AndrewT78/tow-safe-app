import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";

import VanConfig from "./configcomponents/VanConfig"
import { getVanConfig } from "./redux/selectors";


const App = ({ vanConfig }) => {
  return (
   
    <div>
    <Container>               
          {vanConfig ? <div>ATM : {vanConfig.atm}</div> : <div>Welcome to TowSafe, Let's get setup shall we<VanConfig></VanConfig></div>}
    </Container>
    </div>
  );
}

const mapStateToProps = state => {  
  const vanConfig = getVanConfig(state);
  return { vanConfig };
};

export default connect(mapStateToProps)(App);