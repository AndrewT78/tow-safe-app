import { ADD_CAR_LOAD } from "../actionTypes";
import { ADD_VAN_LOAD } from "../actionTypes";

const initialState = {
    carLoad: [],
    vanLoad: []
};

export default function(state = initialState, action) {
        
    switch (action.type) {
        
        case ADD_CAR_LOAD: {            
            
            return {
                ...state,
                carLoad : [action.load].concat(state.carLoad)
            };        
        }        
        case ADD_VAN_LOAD: {            
            
            return {
                ...state,
                vanLoad : [action.load].concat(state.vanLoad)
            };        
        }        
        default:
        return state;
    }
}