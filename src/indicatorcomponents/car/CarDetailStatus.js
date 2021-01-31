import { connect } from "react-redux";
import { getCarConfig } from "./../../redux/selectors";
import { getCarStatus } from "./../../redux/selectors";

import { Alert, Button, Row, Col } from "react-bootstrap";

import { FaTruckPickup, FaSuitcase } from "react-icons/fa";
import { status } from "./../../redux/statusConstants";

import { Link } from "react-router-dom";

const CarDetailStatus = ({ carConfig, carStatus }) => {
  return (
    <>
      <div style={{ marginBottom: "10px", marginTop: "0px" }}>
        <Link to="/" style={{ color: "inherit" }}>
          <Button>Back</Button>
        </Link>
      </div>
      <Alert
        variant={getStatusVariant(carStatus)}
        data-testid="car-detail-status-box"
      >
        <FaTruckPickup size="50" data-testid="car-config"></FaTruckPickup>
        <hr />
        <Row>
          <Col>{`Tare: ${carConfig.tare}kg`}</Col>
        </Row>
        <Row>
          <Col>{`Accessories: ${carStatus.accessoryWeight}kg`}</Col>
        </Row>
        <Row>
          <Col>{`Load: ${carStatus.loadWeight}kg`}</Col>
        </Row>

        <hr />

        <Row>
          <Col>
            <Alert.Heading>{`Total Weight = ${carStatus.totalWeight}kg`}</Alert.Heading>
          </Col>
        </Row>
        <Row>
          <Col>{`Allowed GVM: ${carConfig.gvm}kg`}</Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {carStatus.remainingPayload > 0 ? (
              <>{`You have ${carStatus.remainingPayload}kg payload remaining`}</>
            ) : (
              <>{`You are ${Math.abs(
                carStatus.remainingPayload
              )}kg over your allowed payload`}</>
            )}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <span style={{ fontSize: 12 }}>
              <Link to="/combineddetail" style={{ color: "inherit" }}>
                This does not include your Tow Ball Weight from your Caravan,
                see the combined status (click here)
              </Link>
            </span>
          </Col>
        </Row>
      </Alert>
    </>
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

export default connect(mapStateToProps)(CarDetailStatus);
