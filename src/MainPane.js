import "./App.css";
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
import EditVan from "./configcomponents/van/EditVan";
import EditCar from "./configcomponents/car/EditCar";

import { Redirect, Route, Switch } from "react-router-dom";

const MainPane = ({ vanConfig, carConfig }) => {
  const isVanConfigured = () => {
    return vanConfig.tare > 0;
  };

  const isCarConfigured = () => {
    return carConfig.tare > 0;
  };

  return (
    <Switch>
      <Route path="/carload">
        <ManageCarLoad></ManageCarLoad>
      </Route>
      <Route path="/vanload">
        <ManageVanLoad></ManageVanLoad>
      </Route>
      <Route path="/vanconfig">
        <EditVan></EditVan>
      </Route>
      <Route path="/carconfig">
        <EditCar></EditCar>
      </Route>
      <Route path="/carsetup">
        <>
          <Alert variant="secondary">Now let's setup your tow vehicle</Alert>
          <CarConfig></CarConfig>
        </>
      </Route>
      <Route path="/vansetup">
        <>
          <Alert variant="secondary">
            Welcome to TowSafe, Let's start by setting up your van details
          </Alert>
          <VanConfig></VanConfig>
        </>
      </Route>
      <Route path="/">
        <>
          {!isVanConfigured() ? (
            <Redirect to="/vansetup" />
          ) : !isCarConfigured() ? (
            <Redirect to="/carsetup" />
          ) : (
            <>
              <CarStatus></CarStatus>
              <VanStatus></VanStatus>
              <CombinedStatus></CombinedStatus>
            </>
          )}
        </>
      </Route>
    </Switch>
  );
};

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  const carConfig = getCarConfig(state);
  return { vanConfig, carConfig };
};

export default connect(mapStateToProps)(MainPane);
