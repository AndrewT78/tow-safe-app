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
   
    <div class="App">
    <Container>     
          <VanConfig></VanConfig>       
          {vanConfig ? vanConfig.atm : "No Van Config"}


    </Container>
    </div>
  );
}

const mapStateToProps = state => {  
  console.log('Mapping State to props, state is ', state);
  const vanConfig = getVanConfig(state);
  return { vanConfig };
};

export default connect(mapStateToProps)(App);