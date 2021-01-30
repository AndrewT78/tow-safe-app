import { connect } from "react-redux";
import { getCarConfig, getVanStatus } from "./../redux/selectors";
import { getVanConfig } from "./../redux/selectors";
import { getCombinedStatus } from "./../redux/selectors";

import { Alert, Container, Row, Col } from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import { status } from "./../redux/statusConstants";

const CombinedStatus = ({
  carConfig,
  combinedStatus,
  vanConfig,
  vanStatus,
}) => {
  return (
    <Alert
      variant={getStatusVariant(combinedStatus, vanStatus)}
      data-testid="combined-status-box"
    >
      <Row>
        <Col xs="auto">
          <FaCaravan size="25"></FaCaravan>
          <FaTruckPickup size="25"></FaTruckPickup>
        </Col>
        <Col>
          <Row>
            <Col>
              {`${combinedStatus.totalCombinedWeight} (${carConfig.gcm}) - Combined Weight (GCM)`}
            </Col>
          </Row>
          <Row>
            <Col>{`${combinedStatus.totalCarWeight} (${carConfig.gvm}) - Car Weight inc TBM (GVM)`}</Col>
          </Row>
        </Col>
      </Row>
    </Alert>
  );
};

const getStatusVariant = (combined, vanStatus) => {
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

const mapStateToProps = (state) => {
  const carConfig = getCarConfig(state);
  const combinedStatus = getCombinedStatus(state);
  const vanConfig = getVanConfig(state);
  const vanStatus = getVanStatus(state);
  return { carConfig, combinedStatus, vanConfig, vanStatus };
};

export default connect(mapStateToProps)(CombinedStatus);
