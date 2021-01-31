import "./App.css";
import { connect } from "react-redux";

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
import VanSetup from "./configcomponents/van/VanSetup";
import CarSetup from "./configcomponents/car/CarSetup";
import CarDetailStatus from "./indicatorcomponents/car/CarDetailStatus";
import VanDetailStatus from "./indicatorcomponents/van/VanDetailStatus";
import CombinedDetailStatus from "./indicatorcomponents/combined/CombinedDetailStatus";

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
        <CarSetup></CarSetup>
      </Route>
      <Route path="/vansetup">
        <VanSetup></VanSetup>
      </Route>
      <Route path="/cardetail">
        <CarDetailStatus></CarDetailStatus>
      </Route>
      <Route path="/vandetail">
        <VanDetailStatus></VanDetailStatus>
      </Route>
      <Route path="/combineddetail">
        <CombinedDetailStatus></CombinedDetailStatus>
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
