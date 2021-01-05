import { connect } from "react-redux";
import { getCarConfig } from "./../redux/selectors";
import { getVanConfig } from "./../redux/selectors";
import { getCombinedStatus } from "./../redux/selectors";

import {Alert, Container, Row, Col} from "react-bootstrap";

import { FaCaravan, FaTruckPickup } from "react-icons/fa";
import {status} from "./../redux/statusConstants";


const CombinedStatus = ({ carConfig, combinedStatus, vanConfig }) => {
  
    return (           
      <Container>   
        <Alert variant={getStatusVariant()} data-testid="combined-status-box">
            <Row>
                <Col md="auto"><FaCaravan size="25"></FaCaravan><FaTruckPickup size="25"></FaTruckPickup></Col>
                <Col>
                    <Row>
                        <Col>
                         {`${combinedStatus.totalCombinedWeight} (${carConfig.gcm})`}
                        </Col>                       
                    </Row>
                    <Row>
                        <Col>{`${combinedStatus.totalCarWeight} (${carConfig.gvm})`}</Col>
                    </Row>
                </Col>
            </Row>            
        </Alert>               
      </Container>      
    );
  }

  const getStatusVariant = () => {
      return "secondary";                
  };
  
  const mapStateToProps = state => {  
    const carConfig = getCarConfig(state);
    const combinedStatus = getCombinedStatus(state);
    const vanConfig = getVanConfig(state);
    return { carConfig, combinedStatus, vanConfig };
  };
  
  export default connect(mapStateToProps)(CombinedStatus);