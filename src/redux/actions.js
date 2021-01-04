import { UPDATE_VAN_CONFIG } from "./actionTypes";
import { UPDATE_CAR_CONFIG } from "./actionTypes";


export const updateVanConfig = config => ({
  type: UPDATE_VAN_CONFIG,  
  config  
});

export const updateCarConfig = config => ({
  type: UPDATE_CAR_CONFIG,  
  config  
});