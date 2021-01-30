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
          <Link
            to="/vanconfig"
            data-testid="van-config-link"
            style={{ color: "inherit" }}
          >
            <FaCaravan size="50" data-testid="van-config"></FaCaravan>
          </Link>
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

const mapStateToProps = (state) => {
  const vanConfig = getVanConfig(state);
  const vanStatus = getVanStatus(state);
  return { vanConfig, vanStatus };
};

export default connect(mapStateToProps)(VanStatus);
