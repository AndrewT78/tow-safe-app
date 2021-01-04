import { UPDATE_VAN_CONFIG } from "../actionTypes";
import { UPDATE_CAR_CONFIG } from "../actionTypes";

const initialState = {
    
};

export default function(state = initialState, action) {
    
    switch (action.type) {
        case UPDATE_VAN_CONFIG: {            
            return {
                ...state,
                vanConfig : action.config
            };        
        }
        case UPDATE_CAR_CONFIG: {            
            return {
                ...state,
                carConfig : action.config
            };        
        }
        default:
        return state;
    }
}
