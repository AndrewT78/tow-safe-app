import {
  getVanConfig,
  getCarConfig,
  getCarStatus,
  getVanStatus,
  getCombinedStatus,
  getCarLoad,
  getVanLoad,
  getCarAccessories,
  getVanAccessories,
} from "./selectors";
import { status } from "./statusConstants";

describe("Van selectors", () => {
  const store = {
    configs: {
      vanConfig: {
        tare: 2150,
        atm: 3300,
        tbm: 190,
      },
    },
    loads: {
      vanLoad: [
        { item: "Food", quantity: 5, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 10, enabled: true },
      ],
    },
    accessories: {
      vanAccessories: [
        { accessory: "Gas", weight: 9 },
        { accessory: "Annex", weight: 26 },
      ],
      carAccessories: [
        { accessory: "Bullbar", weight: 80 },
        { accessory: "Roofrack", weight: 18 },
      ],
    },
  };

  const storeWithDisabled = {
    configs: {
      vanConfig: {
        tare: 2150,
        atm: 3300,
        tbm: 180,
      },
    },
    loads: {
      vanLoad: [
        { item: "Food", quantity: 5, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 10, enabled: true },
        { item: "Heavy Stuff", quantity: 1, weight: 1000, enabled: false },
      ],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const storeWarning = {
    configs: {
      vanConfig: {
        tare: 1760,
        atm: 2000,
        tbm: 180,
      },
    },
    loads: {
      vanLoad: [
        { item: "Food", quantity: 5, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 10, enabled: true },
      ],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const storeError = {
    configs: {
      vanConfig: {
        tare: 1861,
        atm: 2000,
        tbm: 180,
      },
    },
    loads: {
      vanLoad: [
        { item: "Food", quantity: 5, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 10, enabled: true },
      ],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const storeTBMUnder = {
    configs: {
      vanConfig: {
        tare: 2150,
        atm: 3300,
        tbm: 180,
      },
    },
    loads: {
      vanLoad: [
        { item: "Food", quantity: 5, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 10, enabled: true },
      ],
    },
    accessories: {
      vanAccessories: [
        { accessory: "Gas", weight: 9 },
        { accessory: "Annex", weight: 26 },
      ],
      carAccessories: [
        { accessory: "Bullbar", weight: 80 },
        { accessory: "Roofrack", weight: 18 },
      ],
    },
  };

  const storeTBMOver = {
    configs: {
      vanConfig: {
        tare: 2150,
        atm: 3300,
        tbm: 305,
      },
    },
    loads: {
      vanLoad: [
        { item: "Food", quantity: 5, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 10, enabled: true },
      ],
    },
    accessories: {
      vanAccessories: [
        { accessory: "Gas", weight: 9 },
        { accessory: "Annex", weight: 26 },
      ],
      carAccessories: [
        { accessory: "Bullbar", weight: 80 },
        { accessory: "Roofrack", weight: 18 },
      ],
    },
  };

  it("should return the totalWeight of the van including the tare, load and accessories", () => {
    expect(getVanStatus(store).totalWeight).toEqual(2325);
  });

  it("should not include the disabled items when calculating weight", () => {
    expect(getVanStatus(storeWithDisabled).totalWeight).toEqual(2290);
  });

  it("should return the remaining payload of the van", () => {
    expect(getVanStatus(store).remainingPayload).toEqual(975);
  });

  it("should return the total load weight in the van", () => {
    expect(getVanStatus(storeWithDisabled).loadWeight).toEqual(140);
  });

  it("should return the total accessory weight in the van", () => {
    expect(getVanStatus(store).accessoryWeight).toEqual(35);
  });

  it("should return a status of OK when the weight is less than the warning threshold", () => {
    expect(getVanStatus(store).status).toEqual(status.OK);
  });

  it("should return a status of WARNING when the weight is above the warning threshold", () => {
    expect(getVanStatus(storeWarning).status).toEqual(status.WARNING);
  });

  it("should return a status of OVER when the weight is above the GVM", () => {
    expect(getVanStatus(storeError).status).toEqual(status.OVER);
  });

  it("should return a TBM status of OK when the TBM is within the recommendations", () => {
    expect(getVanStatus(store).tbmStatus).toEqual(status.OK);
  });

  it("should return a TBM status of WARNING when the TBM is below the recommendation", () => {
    expect(getVanStatus(storeTBMUnder).tbmStatus).toEqual(status.WARNING);
  });

  it("should return a TBM status of WARNING when the TBM is over the recommendation", () => {
    expect(getVanStatus(storeTBMOver).tbmStatus).toEqual(status.WARNING);
  });

  it("should return the van config from the store", () => {
    expect(getVanConfig(store)).toEqual({ atm: 3300, tare: 2150, tbm: 190 });
  });

  it("should return load items for a van", () => {
    expect(getVanLoad(store)).toEqual([
      { item: "Food", quantity: 5, weight: 20, enabled: true },
      { item: "Cases", quantity: 4, weight: 10, enabled: true },
    ]);
  });

  it("should return accessories for a van", () => {
    expect(getVanAccessories(store)).toEqual([
      { accessory: "Gas", weight: 9 },
      { accessory: "Annex", weight: 26 },
    ]);
  });
});

describe("Car selectors", () => {
  const store = {
    configs: {
      carConfig: {
        tare: 1500,
        gvm: 2000,
        gcm: 3000,
      },
    },
    loads: {
      carLoad: [
        { item: "Engel", quantity: 1, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 18, enabled: true },
      ],
    },
    accessories: {
      vanAccessories: [
        { accessory: "Gas", weight: 9 },
        { accessory: "Annex", weight: 26 },
      ],
      carAccessories: [
        { accessory: "Bullbar", weight: 80 },
        { accessory: "Roofrack", weight: 18 },
      ],
    },
  };

  const storeWithDisabled = {
    configs: {
      carConfig: {
        tare: 1000,
        gvm: 2000,
        gcm: 3000,
      },
    },
    loads: {
      carLoad: [
        { item: "Engel", quantity: 1, weight: 20, enabled: true },
        { item: "Cases", quantity: 4, weight: 20, enabled: true },
        { item: "HeavyStuff", quantity: 1, weight: 1000, enabled: false },
      ],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const storeWarning = {
    configs: {
      carConfig: {
        tare: 850,
        gvm: 1000,
        gcm: 3000,
      },
    },
    loads: {
      carLoad: [
        { item: "Heavy Item", weight: 100, quantity: 1, enabled: true },
      ],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const storeError = {
    configs: {
      carConfig: {
        tare: 1000,
        gvm: 1000,
        gcm: 3000,
      },
    },
    loads: {
      carLoad: [{ item: "light Item", weight: 1, quantity: 1, enabled: true }],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  it("should return the car config from the store", () => {
    expect(getCarConfig(store)).toEqual({ tare: 1500, gvm: 2000, gcm: 3000 });
  });

  it("should combine the tare, load and accessories to get the total car weight", () => {
    expect(getCarStatus(store).totalWeight).toEqual(1690);
  });

  it("should only include enabled load items in the total car weight", () => {
    expect(getCarStatus(storeWithDisabled).totalWeight).toEqual(1100);
  });

  it("should return the remaining payload of the car", () => {
    expect(getCarStatus(store).remainingPayload).toEqual(310);
  });

  it("should return the total load weight in the car", () => {
    expect(getCarStatus(storeWithDisabled).loadWeight).toEqual(100);
  });

  it("should return the total accessory weight in the car", () => {
    expect(getCarStatus(store).accessoryWeight).toEqual(98);
  });

  it("should return a status of OK when the weight is less than the warning threshold", () => {
    expect(getCarStatus(store).status).toEqual(status.OK);
  });

  it("should return a status of WARNING when the weight is above the warning threshold", () => {
    expect(getCarStatus(storeWarning).status).toEqual(status.WARNING);
  });

  it("should return a status of OVER when the weight is above the GVM", () => {
    expect(getCarStatus(storeError).status).toEqual(status.OVER);
  });

  it("should return load items for a car", () => {
    expect(getCarLoad(store)).toEqual([
      { item: "Engel", quantity: 1, weight: 20, enabled: true },
      { item: "Cases", quantity: 4, weight: 18, enabled: true },
    ]);
  });

  it("should return accessories for a car", () => {
    expect(getCarAccessories(store)).toEqual([
      { accessory: "Bullbar", weight: 80 },
      { accessory: "Roofrack", weight: 18 },
    ]);
  });
});

describe("Combined selectors", () => {
  const store = {
    configs: {
      carConfig: {
        tare: 3000,
        gvm: 3500,
        gcm: 7000,
      },
      vanConfig: {
        tare: 2000,
        atm: 3000,
        tbm: 180,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const atGvmThresholdStore = {
    configs: {
      carConfig: {
        tare: 1700,
        gvm: 2000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 2000,
        atm: 5000,
        tbm: 200,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const aboveGvmThresholdStore = {
    configs: {
      carConfig: {
        tare: 1701,
        gvm: 2000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 2000,
        atm: 5000,
        tbm: 200,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const atGvmStore = {
    configs: {
      carConfig: {
        tare: 1700,
        gvm: 2000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 2000,
        atm: 5000,
        tbm: 300,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const overGvmStore = {
    configs: {
      carConfig: {
        tare: 1701,
        gvm: 2000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 2000,
        atm: 5000,
        tbm: 300,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const atGcmThresholdStore = {
    configs: {
      carConfig: {
        tare: 7500,
        gvm: 8000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 2000,
        atm: 7000,
        tbm: 300,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const overGcmThresholdStore = {
    configs: {
      carConfig: {
        tare: 7501,
        gvm: 8000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 2000,
        atm: 7000,
        tbm: 300,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const atGcmStore = {
    configs: {
      carConfig: {
        tare: 7000,
        gvm: 8000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 3000,
        atm: 7000,
        tbm: 300,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  const overGcmStore = {
    configs: {
      carConfig: {
        tare: 7001,
        gvm: 8000,
        gcm: 10000,
      },
      vanConfig: {
        tare: 3000,
        atm: 7000,
        tbm: 300,
      },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };

  it("should add the tbm to the car gvm", () => {
    expect(getCombinedStatus(store).totalCarWeight).toEqual(3180);
  });

  it("should add the car weight and trailer weight to calculate the combined mass", () => {
    expect(getCombinedStatus(store).totalCombinedWeight).toEqual(5000);
  });

  it("should return warning when the combined car weight is over the gvm warning threshold", () => {
    expect(getCombinedStatus(aboveGvmThresholdStore).carStatus).toEqual(
      status.WARNING
    );
  });

  it("should return warning when the combined car weight is at the gvm warning threshold", () => {
    expect(getCombinedStatus(atGvmThresholdStore).carStatus).toEqual(
      status.WARNING
    );
  });

  it("should return warning when the combined car weight is equal to the gvm", () => {
    expect(getCombinedStatus(atGvmStore).carStatus).toEqual(status.WARNING);
  });

  it("should return over when the combined car weight is over the gvm", () => {
    expect(getCombinedStatus(overGvmStore).carStatus).toEqual(status.OVER);
  });

  it("should return warning when the combined weight is at the gcm threshold", () => {
    expect(getCombinedStatus(atGcmThresholdStore).combinedStatus).toEqual(
      status.WARNING
    );
  });

  it("should return warning when the combined weight is over the gcm threshold", () => {
    expect(getCombinedStatus(overGcmThresholdStore).combinedStatus).toEqual(
      status.WARNING
    );
  });

  it("should return warning when the combined weight is at the gcm", () => {
    expect(getCombinedStatus(atGcmStore).combinedStatus).toEqual(
      status.WARNING
    );
  });

  it("should return over when the combined weight is over the gcm", () => {
    expect(getCombinedStatus(overGcmStore).combinedStatus).toEqual(status.OVER);
  });
});
