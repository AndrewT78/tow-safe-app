import {status} from "./statusConstants";
import {WARNING_THRESHOLD} from "./statusConstants";

export const getVanConfig = store => {
  return store.configs.vanConfig;
}

export const getCarConfig = store => {
  return store.configs.carConfig;
}

export const getCarStatus = store => {
  var carStatus = status.OK;
  var totalWeight = store.configs.carConfig.tare;

  if (totalWeight > store.configs.carConfig.gvm) {
        carStatus = status.OVER;
  } else if ((totalWeight / store.configs.carConfig.gvm ) >= WARNING_THRESHOLD) {
    carStatus = status.WARNING;
  }

  return { totalWeight, status: carStatus };
}