import "./App.css";
import Container from "react-bootstrap/Container";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";

import VanConfig from "./configcomponents/van/VanConfig";
import CarConfig from "./configcomponents/car/CarConfig";
import { getVanConfig } from "./redux/selectors";
import { getCarConfig } from "./redux/selectors";
import CarStatus from "./indicatorcomponents/CarStatus";
import VanStatus from "./indicatorcomponents/VanStatus";
import ManageCarLoad from "./configcomponents/car/ManageCarLoad";
import ManageVanLoad from "./configcomponents/van/ManageVanLoad";
import CombinedStatus from "./indicatorcomponents/CombinedStatus";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const getVanConfigPane = () => {
  return (
    <div>
      <Alert variant="secondary">
        Welcome to TowSafe, Let's start by setting up your van details
      </Alert>
      <VanConfig></VanConfig>
    </div>
  );
};

const getCarConfigPane = () => {
  return (
    <div>
      <Alert variant="secondary">Now let's setup your tow vehicle</Alert>
      <CarConfig></CarConfig>
    </div>
  );
};

const getStatusPane = () => {
  return (
    <div>
      <CarStatus></CarStatus>
      <VanStatus></VanStatus>
      <CombinedStatus></CombinedStatus>
    </div>
  );
};

const App = ({ vanConfig, carConfig }) => {
  return (
    <Router>
      <Container>
        <Switch>
          <Route path="/carload">
            <ManageCarLoad></ManageCarLoad>
          </Route>
          <Route path="/vanload">
            <ManageVanLoad></ManageVanLoad>
          </Route>
          <Route path="/">
            {vanConfig && carConfig
              ? getStatusPane()
              : vanConfig
              ? getCarConfigPane()
              : getVanConfigPane()}
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  const carConfig = getCarConfig(state);
  return { vanConfig, carConfig };
};

export default connect(mapStateToProps)(App);
