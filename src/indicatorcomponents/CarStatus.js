import { connect } from "react-redux";
import { getCarConfig } from "./../redux/selectors";
import { getCarStatus } from "./../redux/selectors";

import {Alert, Container} from "react-bootstrap";

import { FaTruckPickup } from "react-icons/fa";
import {status} from "./../redux/statusConstants";


const CarStatus = ({ carConfig, carStatus }) => {
  
    return (           
      <Container>   
        <Alert variant={getStatusVariant(carStatus)} data-testid="car-status-box">
            {`${carStatus.totalWeight} (${carConfig.gvm})`}               
        </Alert>               
      </Container>      
    );
  }

  const getStatusVariant = carStatus => {
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
            break
        default:
            variant = "secondary";
            break;
    }   

     return variant; 

  };
  
  const mapStateToProps = state => {  
    const carConfig = getCarConfig(state);
    const carStatus = getCarStatus(state);
    return { carConfig, carStatus };
  };
  
  export default connect(mapStateToProps)(CarStatus);