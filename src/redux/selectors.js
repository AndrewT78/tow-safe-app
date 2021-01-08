import {status} from "./statusConstants";
import {WARNING_THRESHOLD} from "./statusConstants";

export const getVanConfig = store => {
  return store.configs.vanConfig;
}

export const getCarConfig = store => {
  return store.configs.carConfig;
}

export const getCarLoad = store => {
  return store.loads.carLoad;
}

export const getVanLoad = store => {
  return store.loads.vanLoad;
}

const getLoadWeight = load => {
  var weight = 0;
  
  load.forEach(l => {
    weight += l.weight * l.quantity;
  });

  return weight;
}

export const getCarStatus = store => {
  var carStatus = status.OK;
  var totalWeight = store.configs.carConfig.tare + getLoadWeight(store.loads.carLoad);
  var remainingPayload = store.configs.carConfig.gvm - totalWeight;

  if (totalWeight > store.configs.carConfig.gvm) {
        carStatus = status.OVER;
  } else if ((totalWeight / store.configs.carConfig.gvm ) >= WARNING_THRESHOLD) {
    carStatus = status.WARNING;
  }

  return { totalWeight, status: carStatus, remainingPayload };
}

export const getVanStatus = store => {
  var vanStatus = status.OK;
  var totalWeight = store.configs.vanConfig.tare + getLoadWeight(store.loads.vanLoad);
  var remainingPayload = store.configs.vanConfig.atm - totalWeight;

  if (totalWeight > store.configs.vanConfig.atm) {
        vanStatus = status.OVER;
  } else if ((totalWeight / store.configs.vanConfig.atm ) >= WARNING_THRESHOLD) {
    vanStatus = status.WARNING;
  }

  return { totalWeight, status: vanStatus, remainingPayload };
}

export const getCombinedStatus = store => {
  var totalCombinedWeight = getCarStatus(store).totalWeight + getVanStatus(store).totalWeight;
  var totalCarWeight = getCarStatus(store).totalWeight + getVanConfig(store).tbm;
  var combinedStatus = status.OK;
  var carStatus = status.OK;

  if (totalCombinedWeight > store.configs.carConfig.gcm) {
    combinedStatus = status.OVER;
  } else if ((totalCombinedWeight / store.configs.carConfig.gcm >= WARNING_THRESHOLD)) {
    combinedStatus = status.WARNING;
  }

  if (totalCarWeight > store.configs.carConfig.gvm) {
    carStatus = status.OVER;
  } else if ((totalCarWeight / store.configs.carConfig.gvm >= WARNING_THRESHOLD)) {
    carStatus = status.WARNING;
  }

  return { totalCombinedWeight,  totalCarWeight, combinedStatus, carStatus};
}