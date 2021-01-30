import { connect } from "react-redux";
import { getVanConfig } from "../../redux/selectors";
import { getVanStatus } from "../../redux/selectors";

import { Alert, Button, Row, Col } from "react-bootstrap";

import { FaCaravan, FaSuitcase } from "react-icons/fa";
import { status } from "../../redux/statusConstants";

import { Link } from "react-router-dom";

const VanDetailStatus = ({ vanConfig, vanStatus }) => {
  return (
    <>
      <div style={{ marginBottom: "10px", marginTop: "0px" }}>
        <Link to="/" style={{ color: "inherit" }}>
          <Button>Back</Button>
        </Link>
      </div>
      <Alert
        variant={getStatusVariant(vanStatus)}
        data-testid="van-detail-status-box"
      >
        <FaCaravan size="50"></FaCaravan>
        <hr />
        <Row>
          <Col>{`Tare: ${vanConfig.tare}kg`}</Col>
        </Row>
        <Row>
          <Col>{`Accessories: ${vanStatus.accessoryWeight}kg`}</Col>
        </Row>
        <Row>
          <Col>{`Load: ${vanStatus.loadWeight}kg`}</Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <Alert.Heading>{`Total Weight = ${vanStatus.totalWeight}kg`}</Alert.Heading>
          </Col>
        </Row>
        <Row>
          <Col>{`Allowed ATM: ${vanConfig.atm}kg`}</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {vanStatus.remainingPayload > 0 ? (
              <>{`You have ${vanStatus.remainingPayload}kg payload remaining`}</>
            ) : (
              <>{`You are ${Math.abs(
                vanStatus.remainingPayload
              )}kg over your allowed payload`}</>
            )}
          </Col>
        </Row>
      </Alert>
    </>
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

export default connect(mapStateToProps)(VanDetailStatus);
