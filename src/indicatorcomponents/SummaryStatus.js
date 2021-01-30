import { connect } from "react-redux";
import {
  getCombinedStatus,
  getCarStatus,
  getVanStatus,
} from "./../redux/selectors";

import { Container, Row, Col, Alert } from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import { status } from "./../redux/statusConstants";

const getSummaryStatusVariantCar = (item) => {
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

const getSummaryStatusVariantVan = (vanStatus) => {
  var variant = "success";

  if (vanStatus.status === status.OVER) {
    variant = "danger";
  } else if (
    vanStatus.status === status.WARNING ||
    vanStatus.tbmStatus == status.WARNING
  ) {
    variant = "warning";
  }

  return variant;
};

const getSummaryStatusVariantCombined = (combined, vanStatus) => {
  var variant = "success";

  if (
    combined.combinedStatus === status.OVER ||
    combined.carStatus === status.OVER ||
    vanStatus.status === status.OVER
  ) {
    variant = "danger";
  } else if (
    combined.combinedStatus === status.WARNING ||
    combined.carStatus === status.WARNING ||
    vanStatus.tbmStatus === status.WARNING
  ) {
    variant = "warning";
  }
  return variant;
};

const SummaryStatus = ({ combinedStatus, carStatus, vanStatus }) => {
  return (
    <>
      <Row>
        <Col xs={3}>
          <Alert
            variant={getSummaryStatusVariantCar(carStatus)}
            data-testid="car-status"
          >
            <FaTruckPickup size="30"></FaTruckPickup>
          </Alert>
        </Col>
        <Col xs={3}>
          <Alert
            variant={getSummaryStatusVariantVan(vanStatus)}
            data-testid="van-status"
          >
            <FaCaravan size="30"></FaCaravan>
          </Alert>
        </Col>
        <Col xs={6}>
          <Alert
            variant={getSummaryStatusVariantCombined(combinedStatus, vanStatus)}
            data-testid="combined-status"
          >
            <FaCaravan size="30" data-testid="combined-status-van"></FaCaravan>
            <FaTruckPickup
              size="30"
              data-testid="combined-status-car"
            ></FaTruckPickup>
          </Alert>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => {
  const combinedStatus = getCombinedStatus(state);
  const carStatus = getCarStatus(state);
  const vanStatus = getVanStatus(state);
  return { combinedStatus, carStatus, vanStatus };
};

export default connect(mapStateToProps)(SummaryStatus);
