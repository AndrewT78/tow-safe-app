import { UPDATE_VAN_CONFIG } from "./actionTypes";
import { UPDATE_CAR_CONFIG } from "./actionTypes";
import { ADD_CAR_LOAD } from "./actionTypes";
import { DELETE_CAR_LOAD } from "./actionTypes";
import { ADD_VAN_LOAD } from "./actionTypes";
import { DELETE_VAN_LOAD } from "./actionTypes";


export const updateVanConfig = config => ({
  type: UPDATE_VAN_CONFIG,  
  config  
});

export const updateCarConfig = config => ({
  type: UPDATE_CAR_CONFIG,  
  config  
});

export const addCarLoad = load => ({
  type: ADD_CAR_LOAD,  
  load
});

export const deleteCarLoad = id => ({
  type: DELETE_CAR_LOAD,  
  id
});

export const addVanLoad = load => ({
  type: ADD_VAN_LOAD,  
  load
});

export const deleteVanLoad = id => ({
  type: DELETE_VAN_LOAD,  
  id
});