import { connect } from "react-redux";
import { getCarConfig } from "./../redux/selectors";
import { getCarStatus } from "./../redux/selectors";

import { Alert, Container, Row, Col } from "react-bootstrap";

import { FaTruckPickup, FaSuitcase } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { status } from "./../redux/statusConstants";

import { Link } from "react-router-dom";

const CarStatus = ({ carConfig, carStatus }) => {
  return (
    <Alert variant={getStatusVariant(carStatus)} data-testid="car-status-box">
      <Row>
        <Col xs={"auto"}>
          <Link
            to="/carconfig"
            data-testid="car-config-link"
            style={{ color: "inherit" }}
          >
            <FaTruckPickup size="50" data-testid="car-config"></FaTruckPickup>
          </Link>
        </Col>
        <Col>
          <Row>
            <Col>
              <Alert.Heading>
                {`${carStatus.totalWeight} (${carConfig.gvm})`}{" "}
              </Alert.Heading>
            </Col>
          </Row>
          <Row>
            <Col>
              <Link
                to="/cardetail"
                data-testid="car-detail-status-link"
                style={{ color: "inherit" }}
              >
                <span style={{ fontSize: 10 }}>
                  <BsInfoCircle></BsInfoCircle> Click to see more information
                </span>
              </Link>
            </Col>
          </Row>
        </Col>
        <Col xs={"auto"}>
          <Link
            to="/carload"
            data-testid="car-load-link"
            style={{ color: "inherit" }}
          >
            <FaSuitcase size="25" data-testid="car-manage-load"></FaSuitcase>
          </Link>
        </Col>
      </Row>
    </Alert>
  );
};

const getStatusVariant = (carStatus) => {
  var variant;
  switch (carStatus.status) {
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
  const carConfig = getCarConfig(state);
  const carStatus = getCarStatus(state);
  return { carConfig, carStatus };
};

export default connect(mapStateToProps)(CarStatus);
