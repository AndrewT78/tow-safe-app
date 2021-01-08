import { ADD_CAR_LOAD } from "../actionTypes";
import { ADD_VAN_LOAD } from "../actionTypes";
import { DELETE_CAR_LOAD } from "../actionTypes";
import { DELETE_VAN_LOAD } from "../actionTypes";

const initialState = {
    carLoad: [],
    vanLoad: []
};

function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

function removeLoadItem(loadArray, id) {       
            var indexToRemove = loadArray.findIndex(l => l.id === id);
            if (indexToRemove >= 0) {
                loadArray.splice(indexToRemove, 1);
            }

            return loadArray;
}

export default function(state = initialState, action) {
        
    switch (action.type) {
        
        case ADD_CAR_LOAD: {     
            
            action.load.id = guid();
            
            return {
                ...state,
                carLoad : [action.load].concat(state.carLoad)
            };        
        }        
        case ADD_VAN_LOAD: {          
            
            action.load.id = guid();
            
            return {
                ...state,
                vanLoad : [action.load].concat(state.vanLoad)
            };        
        }        
        case DELETE_CAR_LOAD: {   
                        
            return {
                ...state,
                carLoad: removeLoadItem(state.carLoad, action.id)
            }
        }
        case DELETE_VAN_LOAD: {   
           
            return {
                ...state,
                vanLoad: removeLoadItem(state.vanLoad, action.id)
            }
        }
        default:
        return state;
    }
}