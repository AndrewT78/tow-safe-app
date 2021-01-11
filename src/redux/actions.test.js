import * as actions from "./actions";
import * as types from "./actionTypes";

describe("Van Config Actions", () => {
  it("should create an action to update the van config", () => {
    const config = { atm: 220, tare: 100, tbm: 10 };
    const expectedAction = {
      type: types.UPDATE_VAN_CONFIG,
      config,
    };
    expect(actions.updateVanConfig(config)).toEqual(expectedAction);
  });
});

describe("Car Config Actions", () => {
  it("should create an action to update the car config", () => {
    const config = { gvm: 1000, tare: 100, gcm: 2000 };
    const expectedAction = {
      type: types.UPDATE_CAR_CONFIG,
      config,
    };
    expect(actions.updateCarConfig(config)).toEqual(expectedAction);
  });
});

describe("Car Load Actions", () => {
  it("should create an action to add a car load item", () => {
    const load = { item: "Food", quantity: 10, weight: 8 };
    const expectedAction = {
      type: types.ADD_CAR_LOAD,
      load,
    };
    expect(actions.addCarLoad(load)).toEqual(expectedAction);
  });

  it("should create an action to delete a car load item", () => {
    const id = "ID1234";
    const expectedAction = {
      type: types.DELETE_CAR_LOAD,
      id,
    };
    expect(actions.deleteCarLoad(id)).toEqual(expectedAction);
  });

  it("should create an action to toggle a car load item", () => {
    const id = "ID1234";
    const expectedAction = {
      type: types.TOGGLE_CAR_LOAD,
      id,
    };
    expect(actions.toggleCarLoad(id)).toEqual(expectedAction);
  });

  it("should create an action to move a car load item to the van", () => {
    const id = "ID1234";
    const expectedAction = {
      type: types.MOVE_LOAD_TO_VAN,
      id,
    };
    expect(actions.moveLoadToVan(id)).toEqual(expectedAction);
  });
});

describe("Van Load Actions", () => {
  it("should create an action to add a van load item", () => {
    const load = { item: "Sheets", quantity: 10, weight: 8 };
    const expectedAction = {
      type: types.ADD_VAN_LOAD,
      load,
    };
    expect(actions.addVanLoad(load)).toEqual(expectedAction);
  });

  it("should create an action to delete a van load item", () => {
    const id = "ID1234";
    const expectedAction = {
      type: types.DELETE_VAN_LOAD,
      id,
    };
    expect(actions.deleteVanLoad(id)).toEqual(expectedAction);
  });

  it("should create an action to toggle a van load item", () => {
    const id = "ID1234";
    const expectedAction = {
      type: types.TOGGLE_VAN_LOAD,
      id,
    };
    expect(actions.toggleVanLoad(id)).toEqual(expectedAction);
  });

  it("should create an action to move a van load item to the car", () => {
    const id = "ID1234";
    const expectedAction = {
      type: types.MOVE_LOAD_TO_CAR,
      id,
    };
    expect(actions.moveLoadToCar(id)).toEqual(expectedAction);
  });
});
