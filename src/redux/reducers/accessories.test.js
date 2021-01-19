import reducer from "./accessories";
import * as types from "../actionTypes";

describe("accessories reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      carAccessories: [],
      vanAccessories: [],
    });
  });

  it("should add an accessory item to the car", () => {
    expect(
      reducer(
        { carAccessories: [] },
        {
          type: types.ADD_CAR_ACC,
          accessory: { accessory: "Bullbar", weight: 80 },
        }
      ).carAccessories
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ accessory: "Bullbar", weight: 80 }),
      ])
    );
  });

  it("should prepend a second accessory to the car", () => {
    expect(
      reducer(
        { carAccessories: [{ accessory: "Bullbar", weight: 80 }] },
        {
          type: types.ADD_CAR_ACC,
          accessory: { accessory: "Roofrack", weight: 20 },
        }
      ).carAccessories
    ).toHaveLength(2);

    expect(
      reducer(
        { carAccessories: [{ accessory: "Bullbar", weight: 80 }] },
        {
          type: types.ADD_CAR_ACC,
          accessory: { accessory: "Roofrack", weight: 20 },
        }
      ).carAccessories[0]
    ).toEqual(
      expect.objectContaining({
        accessory: "Roofrack",
        weight: 20,
      })
    );
  });

  it("should delete a car accessory item", () => {
    expect(
      reducer(
        {
          carAccessories: [
            { accessory: "Bullbar", weight: 80, id: "Bar1" },
            { accessory: "Roofrack", weight: 18, id: "Rack1" },
          ],
        },
        {
          type: types.DELETE_CAR_ACC,
          id: "Bar1",
        }
      )
    ).toEqual({
      carAccessories: [{ accessory: "Roofrack", weight: 18, id: "Rack1" }],
    });
  });

  it("should add an accessory item to the van", () => {
    expect(
      reducer(
        { vanAccessories: [] },
        {
          type: types.ADD_VAN_ACC,
          accessory: { accessory: "Gas", weight: 18 },
        }
      ).vanAccessories
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ accessory: "Gas", weight: 18 }),
      ])
    );
  });

  it("should prepend a second accessory to the van", () => {
    expect(
      reducer(
        { vanAccessories: [{ accessory: "Gas", weight: 18 }] },
        {
          type: types.ADD_VAN_ACC,
          accessory: { accessory: "Annex", weight: 25 },
        }
      ).vanAccessories
    ).toHaveLength(2);

    expect(
      reducer(
        { vanAccessories: [{ accessory: "Gas", weight: 18 }] },
        {
          type: types.ADD_VAN_ACC,
          accessory: { accessory: "Annex", weight: 25 },
        }
      ).vanAccessories[0]
    ).toEqual(
      expect.objectContaining({
        accessory: "Annex",
        weight: 25,
      })
    );
  });

  it("should delete a van accessory item", () => {
    expect(
      reducer(
        {
          vanAccessories: [
            { accessory: "Gas", weight: 18, id: "Gas1" },
            { accessory: "Annex", weight: 25, id: "Annex1" },
          ],
        },
        {
          type: types.DELETE_VAN_ACC,
          id: "Gas1",
        }
      )
    ).toEqual({
      vanAccessories: [{ accessory: "Annex", weight: 25, id: "Annex1" }],
    });
  });
});
