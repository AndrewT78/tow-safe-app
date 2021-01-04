import { connect } from "react-redux";
import { getCarConfig } from "./../redux/selectors";
import { getCarStatus } from "./../redux/selectors";

import {Alert, Container} from "react-bootstrap";

import { FaTruckPickup } from "react-icons/fa";


const CarStatus = ({ carConfig, carStatus }) => {
  
    return (           
      <Container>   
        <Alert variant="secondary">
            {`${carStatus.totalWeight} (${carConfig.gvm})`}               
        </Alert>               
      </Container>      
    );
  }
  
  const mapStateToProps = state => {  
    const carConfig = getCarConfig(state);
    const carStatus = getCarStatus(state);
    return { carConfig, carStatus };
  };
  
  export default connect(mapStateToProps)(CarStatus);