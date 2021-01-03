import { UPDATE_VAN_CONFIG } from "../actionTypes";

const initialState = {
};

export default function(state = initialState, action) {
    
    switch (action.type) {
        case UPDATE_VAN_CONFIG: {            
            return {
                ...state,
                vanConfig : action.payload.config
            };        
        }
        default:
        return state;
    }
}
