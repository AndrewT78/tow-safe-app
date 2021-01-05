import { connect } from "react-redux";
import { getVanConfig } from "./../redux/selectors";
import { getVanStatus } from "./../redux/selectors";

import {Alert, Container, Row, Col} from "react-bootstrap";

import { FaCaravan } from "react-icons/fa";
import {status} from "./../redux/statusConstants";


const VanStatus = ({ vanConfig, vanStatus }) => {
  
    return (           
      <Container>   
        <Alert variant={getStatusVariant(vanStatus)} data-testid="van-status-box">
            <Row>
                <Col md="auto"><FaCaravan size="50"></FaCaravan></Col>
                <Col>
                    <Row>
                        <Col>
                        {`${vanStatus.totalWeight} (${vanConfig.atm})`}
                        </Col>                       
                    </Row>
                    <Row>
                        <Col>{`Remaining Payload: ${vanStatus.remainingPayload}`}</Col>
                    </Row>
                </Col>
            </Row>            
            
            
        </Alert>               
      </Container>      
    );
  }

  const getStatusVariant = vanStatus => {
      var variant;      
    switch (vanStatus.status) {
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
    const vanConfig = getVanConfig(state);
    const vanStatus = getVanStatus(state);
    return { vanConfig, vanStatus };
  };
  
  export default connect(mapStateToProps)(VanStatus);