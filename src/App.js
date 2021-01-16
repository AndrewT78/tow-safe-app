import "./App.css";
import Container from "react-bootstrap/Container";
import MainPane from "./MainPane";

import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Container>
        <MainPane></MainPane>
      </Container>
    </Router>
  );
};

export default App;
