import { connect } from "react-redux";
import { getCarConfig } from "./../redux/selectors";
import { getVanConfig } from "./../redux/selectors";
import { getCombinedStatus } from "./../redux/selectors";

import { Alert, Container, Row, Col } from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import { status } from "./../redux/statusConstants";

const CombinedStatus = ({ carConfig, combinedStatus, vanConfig }) => {
  return (
    <Alert
      variant={getStatusVariant(combinedStatus)}
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
  const carConfig = getCarConfig(state);
  const combinedStatus = getCombinedStatus(state);
  const vanConfig = getVanConfig(state);
  return { carConfig, combinedStatus, vanConfig };
};

export default connect(mapStateToProps)(CombinedStatus);
