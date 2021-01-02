import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import VanConfig from "./configcomponents/VanConfig"


function App() {
  return (
    <Router>
    <div class="App">
    <Container> 
      <Switch>
        <Route path="/van">
          <VanConfig></VanConfig>
        </Route> 
        <Route path="/">
        <Row>
        <Col>
          <Link to="van">
            <Button variant="primary" size="lg" block>
              Get Started
           </Button> 
         </Link>  
        </Col>
      </Row>
        </Route> 
      </Switch>          
    </Container>
    </div>
    </Router>
  );
}



export default App;


