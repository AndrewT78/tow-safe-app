import { connect } from "react-redux";
import { getCarConfig } from "./../redux/selectors";

import {Alert, Container} from "react-bootstrap";


const CarStatus = ({ carConfig }) => {
  
    return (           
      <Container>   
        <Alert variant="secondary">
          Tare : {carConfig.tare}    
          GVM : {carConfig.gvm}          
        </Alert>               
      </Container>      
    );
  }
  
  const mapStateToProps = state => {  
    const carConfig = getCarConfig(state);
    return { carConfig };
  };
  
  export default connect(mapStateToProps)(CarStatus);