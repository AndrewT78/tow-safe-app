import { connect } from "react-redux";
import { getVanConfig } from "./../redux/selectors";
import { getVanStatus } from "./../redux/selectors";

import { Alert, Container, Row, Col } from "react-bootstrap";

import { FaCaravan, FaSuitcase } from "react-icons/fa";
import { status } from "./../redux/statusConstants";

import { Link } from "react-router-dom";

const VanStatus = ({ vanConfig, vanStatus }) => {
  return (
    <Alert variant={getStatusVariant(vanStatus)} data-testid="van-status-box">
      <Row>
        <Col xs="auto">
          <FaCaravan size="50"></FaCaravan>
        </Col>
        <Col>
          <Row>
            <Col>
              {`${vanStatus.totalWeight} (${vanConfig.atm}) - Total Weight (ATM)`}
            </Col>
          </Row>
          <Row>
            <Col>{`${vanStatus.remainingPayload} - Remaining Payload`}</Col>
          </Row>
        </Col>
        <Col xs={"auto"}>
          <Link
            to="/vanload"
            data-testid="van-load-link"
            style={{ color: "inherit" }}
          >
            <FaSuitcase size="25" data-testid="van-manage-load"></FaSuitcase>
          </Link>
        </Col>
      </Row>
    </Alert>
  );
};

const getStatusVariant = (vanStatus) => {
  var variant;
  switch (vanStatus.status) {
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

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  const vanStatus = getVanStatus(state);
  return { vanConfig, vanStatus };
};

export default connect(mapStateToProps)(VanStatus);
