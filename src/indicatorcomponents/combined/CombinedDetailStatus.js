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

const CombinedDetailStatus = ({ combinedStatus, vanStatus }) => {
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
        <hr />

        {vanStatus.tbmStatus === status.WARNING ? (
          <>
            <hr />
            Your Tow Ball Mass is outside of recommendations, its is recommended
            to keep your TBM approx 10% of your overall van weight. TowSafe App
            will display this warning when you are outside of the 8-12% range
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
