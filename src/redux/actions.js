import { UPDATE_VAN_CONFIG } from "./actionTypes";


export const updateVanConfig = config => ({
  type: UPDATE_VAN_CONFIG,
  payload: {    
    config
  }
});

