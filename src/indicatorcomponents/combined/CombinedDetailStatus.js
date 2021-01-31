import { connect } from "react-redux";
import {
  getVanConfig,
  getVanStatus,
  getCombinedStatus,
  getCarConfig,
  getCarStatus,
} from "../../redux/selectors";

import { Alert, Button, Row, Col } from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import { status } from "../../redux/statusConstants";

import { Link } from "react-router-dom";

const CombinedDetailStatus = ({
  combinedStatus,
  vanStatus,
  carConfig,
  carStatus,
}) => {
  return (
    <>
      <div style={{ marginBottom: "10px", marginTop: "0px" }}>
        <Link to="/" style={{ color: "inherit" }}>
          <Button>Back</Button>
        </Link>
      </div>
      <Alert
        variant={getStatusVariant(combinedStatus, vanStatus)}
        data-testid="combined-detail-status-box"
      >
        <FaCaravan size="50"></FaCaravan>
        <FaTruckPickup size="50"></FaTruckPickup>
        <hr />

        <Row>
          <Col>
            <Alert.Heading>{`Car Weight (inc TBM): ${combinedStatus.totalCarWeight}kg`}</Alert.Heading>
          </Col>
        </Row>
        <Row>
          <Col>{`Car Allowed GVM: ${carConfig.gvm}kg`}</Col>
        </Row>
        <Row>
          <Col>
            {combinedStatus.totalCarWeight > carConfig.gvm ? (
              <>Your car is over its GVM</>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <Alert.Heading>{`Total Combined Weight: ${combinedStatus.totalCombinedWeight}kg`}</Alert.Heading>
          </Col>
        </Row>
        <Row>
          <Col>{`Car Allowed GCM: ${carConfig.gcm}kg`}</Col>
        </Row>
        <Row>
          <Col>
            {combinedStatus.totalCombinedWeight > carConfig.gcm ? (
              <>Your car is over its GCM</>
            ) : (
              <></>
            )}
          </Col>
        </Row>

        {vanStatus.tbmStatus === status.WARNING ? (
          <>
            <hr />
            <span style={{ fontSize: 10 }}>
              Your Tow Ball Mass is outside of recommendations, its is
              recommended to keep your TBM approx 10% of your overall van
              weight. TowSafe App will display this warning when you are outside
              of the 8-12% range
            </span>
          </>
        ) : (
          <></>
        )}
      </Alert>
    </>
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
  const vanConfig = getVanConfig(state);
  const vanStatus = getVanStatus(state);
  const carConfig = getCarConfig(state);
  const carStatus = getCarStatus(state);
  const combinedStatus = getCombinedStatus(state);

  return { vanConfig, vanStatus, carConfig, carStatus, combinedStatus };
};

export default connect(mapStateToProps)(CombinedDetailStatus);
