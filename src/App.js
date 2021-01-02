import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

function App() {
  return (
    <div class="App">
    <Container>      
      <Row>
        <Col>
        <Button variant="primary" size="lg" block>
      Get Started
    </Button>{' '}       
    </Col>
    </Row>
    </Container>
    </div>
  );
}

export default App;
