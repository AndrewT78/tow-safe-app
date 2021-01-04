export const getVanConfig = store => {
  return store.configs.vanConfig;
}

export const getCarConfig = store => {
  return store.configs.carConfig;
}

export const getCarStatus = store => {
  return { totalWeight: store.configs.carConfig.tare };
}