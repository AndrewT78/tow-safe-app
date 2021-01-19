import {
  TOGGLE_CAR_LOAD,
  TOGGLE_VAN_LOAD,
  DELETE_VAN_LOAD,
  ADD_VAN_LOAD,
  DELETE_CAR_LOAD,
  ADD_CAR_LOAD,
  UPDATE_CAR_CONFIG,
  UPDATE_VAN_CONFIG,
  MOVE_LOAD_TO_VAN,
  MOVE_LOAD_TO_CAR,
  ADD_CAR_ACC,
  DELETE_CAR_ACC,
  ADD_VAN_ACC,
  DELETE_VAN_ACC,
} from "./actionTypes";

export const updateVanConfig = (config) => ({
  type: UPDATE_VAN_CONFIG,
  config,
});

export const updateCarConfig = (config) => ({
  type: UPDATE_CAR_CONFIG,
  config,
});

export const addCarLoad = (load) => ({
  type: ADD_CAR_LOAD,
  load,
});

export const deleteCarLoad = (id) => ({
  type: DELETE_CAR_LOAD,
  id,
});

export const addVanLoad = (load) => ({
  type: ADD_VAN_LOAD,
  load,
});

export const deleteVanLoad = (id) => ({
  type: DELETE_VAN_LOAD,
  id,
});

export const toggleVanLoad = (id) => ({
  type: TOGGLE_VAN_LOAD,
  id,
});

export const toggleCarLoad = (id) => ({
  type: TOGGLE_CAR_LOAD,
  id,
});

export const moveLoadToCar = (id) => ({
  type: MOVE_LOAD_TO_CAR,
  id,
});

export const moveLoadToVan = (id) => ({
  type: MOVE_LOAD_TO_VAN,
  id,
});

export const addCarAccessory = (acc) => ({
  type: ADD_CAR_ACC,
  accessory: acc,
});

export const deleteCarAccessory = (id) => ({
  type: DELETE_CAR_ACC,
  id,
});

export const addVanAccessory = (acc) => ({
  type: ADD_VAN_ACC,
  accessory: acc,
});

export const deleteVanAccessory = (id) => ({
  type: DELETE_VAN_ACC,
  id,
});
