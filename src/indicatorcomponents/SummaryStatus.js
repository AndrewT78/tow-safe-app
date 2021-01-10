import { connect } from "react-redux";
import {
  getCombinedStatus,
  getCarStatus,
  getVanStatus,
} from "./../redux/selectors";

import { Container, Row, Col } from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import { status } from "./../redux/statusConstants";

const ok = {
  color: "#155724",
};

const warning = {
  color: "#856404",
};

const over = {
  color: "#721c24",
};

const getStyle = (item) => {
  var style;
  switch (item.status) {
    case status.OK:
      style = ok;
      break;
    case status.WARNING:
      style = warning;
      break;
    case status.OVER:
      style = over;
      break;
    default:
      style = over;
      break;
  }

  return style;
};

const getStyleCombined = (combinedStatus) => {
  var style = ok;

  if (
    combinedStatus.combinedStatus === status.OVER ||
    combinedStatus.carStatus === status.OVER
  ) {
    style = over;
  } else if (
    combinedStatus.combinedStatus === status.WARNING ||
    combinedStatus.carStatus === status.WARNING
  ) {
    style = warning;
  }

  return style;
};

const SummaryStatus = ({ combinedStatus, carStatus, vanStatus }) => {
  return (
    <Container>
      <Row>
        <Col>
          <FaTruckPickup
            size="40"
            style={getStyle(carStatus)}
            data-testid="car-status"
          ></FaTruckPickup>
        </Col>
        <Col>
          <FaCaravan
            size="40"
            style={getStyle(vanStatus)}
            data-testid="van-status"
          ></FaCaravan>
        </Col>
        <Col>
          <FaCaravan
            size="40"
            style={getStyleCombined(combinedStatus)}
            data-testid="combined-status-van"
          ></FaCaravan>
          <FaTruckPickup
            size="40"
            style={getStyleCombined(combinedStatus)}
            data-testid="combined-status-car"
          ></FaTruckPickup>
        </Col>
      </Row>
    </Container>
  );
};

const getStatusVariant = (combinedStatus) => {
  var variant = "success";

  if (
    combinedStatus.combinedStatus === status.OVER ||
    combinedStatus.carStatus === status.OVER
  ) {
    variant = "danger";
  } else if (
    combinedStatus.combinedStatus === status.WARNING ||
    combinedStatus.carStatus === status.WARNING
  ) {
    variant = "warning";
  }

  return variant;
};

const mapStateToProps = (state) => {
  const combinedStatus = getCombinedStatus(state);
  const carStatus = getCarStatus(state);
  const vanStatus = getVanStatus(state);
  return { combinedStatus, carStatus, vanStatus };
};

export default connect(mapStateToProps)(SummaryStatus);
