import { UPDATE_VAN_CONFIG } from "../actionTypes";
import { UPDATE_CAR_CONFIG } from "../actionTypes";

const initialState = {
    //carConfig: { gvm: 3650, tare: 2900, gcm: 7000},
    //vanConfig: { atm: 3300, tbm: 180, tare: 2250}
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
