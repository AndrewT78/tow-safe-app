import reducer from "./configs";
import * as types from "../actionTypes";

describe("configs reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      vanConfig: {},
      carConfig: {},
    });
  });

  it("should update the van config", () => {
    expect(
      reducer([], {
        type: types.UPDATE_VAN_CONFIG,
        config: { atm: 1000, tare: 500, tbm: 20 },
      })
    ).toEqual({
      vanConfig: { atm: 1000, tare: 500, tbm: 20 },
    });
  });

  it("should update the car config", () => {
    expect(
      reducer([], {
        type: types.UPDATE_CAR_CONFIG,
        config: { gvm: 2000, tare: 1000, gcm: 3000 },
      })
    ).toEqual({
      carConfig: { gvm: 2000, tare: 1000, gcm: 3000 },
    });
  });
});
