import { ADD_CAR_LOAD } from "../actionTypes";

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
        default:
        return state;
    }
}