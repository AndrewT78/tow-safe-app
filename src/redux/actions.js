import {
  TOGGLE_CAR_LOAD,
  TOGGLE_VAN_LOAD,
  DELETE_VAN_LOAD,
  ADD_VAN_LOAD,
  DELETE_CAR_LOAD,
  ADD_CAR_LOAD,
  UPDATE_CAR_CONFIG,
  UPDATE_VAN_CONFIG,
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
