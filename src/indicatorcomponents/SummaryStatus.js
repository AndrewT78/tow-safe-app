import { connect } from "react-redux";
import {
  getCombinedStatus,
  getCarStatus,
  getVanStatus,
} from "./../redux/selectors";

import { Container, Row, Col, Alert } from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import { status } from "./../redux/statusConstants";

const getSummaryStatusVariant = (item) => {
  var variant;
  switch (item.status) {
    case status.OK:
      variant = "success";
      break;
    case status.WARNING:
      variant = "warning";
      break;
    case status.OVER:
      variant = "danger";
      break;
    default:
      variant = "secondary";
      break;
  }

  return variant;
};

const getSummaryStatusVariantCombined = (combined) => {
  var variant = "success";

  if (
    combined.combinedStatus === status.OVER ||
    combined.carStatus === status.OVER
  ) {
    variant = "danger";
  } else if (
    combined.combinedStatus === status.WARNING ||
    combined.carStatus === status.WARNING
  ) {
    variant = "warning";
  }
  return variant;
};

const SummaryStatus = ({ combinedStatus, carStatus, vanStatus }) => {
  return (
    <Container>
      <Row>
        <Col xs="auto">
          <Alert
            variant={getSummaryStatusVariant(carStatus)}
            data-testid="car-status"
          >
            <FaTruckPickup size="40"></FaTruckPickup>
          </Alert>
        </Col>
        <Col xs="auto">
          <Alert
            variant={getSummaryStatusVariant(vanStatus)}
            data-testid="van-status"
          >
            <FaCaravan size="40"></FaCaravan>
          </Alert>
        </Col>
        <Col xs="auto">
          <Alert
            variant={getSummaryStatusVariantCombined(combinedStatus)}
            data-testid="combined-status"
          >
            <FaCaravan size="40" data-testid="combined-status-van"></FaCaravan>
            <FaTruckPickup
              size="40"
              data-testid="combined-status-car"
            ></FaTruckPickup>
          </Alert>
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
