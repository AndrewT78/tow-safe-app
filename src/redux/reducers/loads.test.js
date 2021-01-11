import reducer from "./loads";
import * as types from "../actionTypes";

describe("loads reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      carLoad: [],
      vanLoad: [],
    });
  });

  it("should add a load item to the car", () => {
    expect(
      reducer(
        { carLoad: [] },
        {
          type: types.ADD_CAR_LOAD,
          load: { item: "Weber", quantity: 1, weight: 20 },
        }
      ).carLoad
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ item: "Weber", quantity: 1, weight: 20 }),
      ])
    );
  });

  it("should enable the car load item by default", () => {
    expect(
      reducer(
        { carLoad: [] },
        {
          type: types.ADD_CAR_LOAD,
          load: { item: "Weber", quantity: 1, weight: 20 },
        }
      ).carLoad
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item: "Weber",
          quantity: 1,
          weight: 20,
          enabled: true,
        }),
      ])
    );
  });

  it("should prepend a second load to the car", () => {
    expect(
      reducer(
        { carLoad: [{ item: "Engel", quantity: 1, weight: 25 }] },
        {
          type: types.ADD_CAR_LOAD,
          load: { item: "Weber", quantity: 1, weight: 20 },
        }
      ).carLoad
    ).toHaveLength(2);

    expect(
      reducer(
        { carLoad: [{ item: "Engel", quantity: 1, weight: 25 }] },
        {
          type: types.ADD_CAR_LOAD,
          load: { item: "Weber", quantity: 1, weight: 20 },
        }
      ).carLoad[0]
    ).toEqual(
      expect.objectContaining({
        item: "Weber",
        quantity: 1,
        weight: 20,
      })
    );
  });

  it("should delete a car load item", () => {
    expect(
      reducer(
        {
          carLoad: [
            { item: "Engel", quantity: 1, weight: 25, id: "Engel1" },
            { item: "Beer", quantity: 24, weight: 1, id: "Beer1" },
          ],
        },
        {
          type: types.DELETE_CAR_LOAD,
          id: "Engel1",
        }
      )
    ).toEqual({
      carLoad: [{ item: "Beer", quantity: 24, weight: 1, id: "Beer1" }],
    });
  });

  it("should toggle a car load item off", () => {
    expect(
      reducer(
        {
          carLoad: [
            {
              item: "Engel",
              quantity: 1,
              weight: 25,
              id: "Engel1",
              enabled: true,
            },
            {
              item: "Beer",
              quantity: 24,
              weight: 1,
              id: "Beer1",
              enabled: true,
            },
          ],
        },
        {
          type: types.TOGGLE_CAR_LOAD,
          id: "Engel1",
        }
      )
    ).toEqual({
      carLoad: [
        {
          item: "Engel",
          quantity: 1,
          weight: 25,
          id: "Engel1",
          enabled: false,
        },
        {
          item: "Beer",
          quantity: 24,
          weight: 1,
          id: "Beer1",
          enabled: true,
        },
      ],
    });
  });

  it("should toggle a car load item on", () => {
    expect(
      reducer(
        {
          carLoad: [
            {
              item: "Engel",
              quantity: 1,
              weight: 25,
              id: "Engel1",
              enabled: false,
            },
            {
              item: "Beer",
              quantity: 24,
              weight: 1,
              id: "Beer1",
              enabled: false,
            },
          ],
        },
        {
          type: types.TOGGLE_CAR_LOAD,
          id: "Beer1",
        }
      )
    ).toEqual({
      carLoad: [
        {
          item: "Engel",
          quantity: 1,
          weight: 25,
          id: "Engel1",
          enabled: false,
        },
        {
          item: "Beer",
          quantity: 24,
          weight: 1,
          id: "Beer1",
          enabled: true,
        },
      ],
    });
  });

  it("should add a load item to the van", () => {
    expect(
      reducer(
        { vanLoad: [] },
        {
          type: types.ADD_VAN_LOAD,
          load: { item: "Pots & Pans", quantity: 5, weight: 2 },
        }
      ).vanLoad
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item: "Pots & Pans",
          quantity: 5,
          weight: 2,
        }),
      ])
    );
  });

  it("should enable the van load item by default", () => {
    expect(
      reducer(
        { vanLoad: [] },
        {
          type: types.ADD_VAN_LOAD,
          load: { item: "Weber", quantity: 1, weight: 20 },
        }
      ).vanLoad
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item: "Weber",
          quantity: 1,
          weight: 20,
          enabled: true,
        }),
      ])
    );
  });

  it("should prepend a second load to the van", () => {
    expect(
      reducer(
        { vanLoad: [{ item: "Pots & Pans", quantity: 5, weight: 2 }] },
        {
          type: types.ADD_VAN_LOAD,
          load: { item: "Sheets", quantity: 8, weight: 1 },
        }
      ).vanLoad
    ).toHaveLength(2);

    expect(
      reducer(
        { vanLoad: [{ item: "Pots & Pans", quantity: 5, weight: 2 }] },
        {
          type: types.ADD_VAN_LOAD,
          load: { item: "Sheets", quantity: 8, weight: 1 },
        }
      ).vanLoad[0]
    ).toEqual(
      expect.objectContaining({
        item: "Sheets",
        quantity: 8,
        weight: 1,
      })
    );
  });

  it("should delete a van load item", () => {
    expect(
      reducer(
        {
          vanLoad: [
            { item: "Sheets", quantity: 8, weight: 1, id: "Sheets1" },
            { item: "Food", quantity: 40, weight: 1, id: "Food1" },
          ],
        },
        {
          type: types.DELETE_VAN_LOAD,
          id: "Food1",
        }
      )
    ).toEqual({
      vanLoad: [{ item: "Sheets", quantity: 8, weight: 1, id: "Sheets1" }],
    });
  });

  it("should toggle on a van load item", () => {
    expect(
      reducer(
        {
          vanLoad: [
            {
              item: "Sheets",
              quantity: 8,
              weight: 1,
              id: "Sheets1",
              enabled: false,
            },
            {
              item: "Food",
              quantity: 40,
              weight: 1,
              id: "Food1",
              enabled: false,
            },
          ],
        },
        {
          type: types.TOGGLE_VAN_LOAD,
          id: "Food1",
        }
      )
    ).toEqual({
      vanLoad: [
        {
          item: "Sheets",
          quantity: 8,
          weight: 1,
          id: "Sheets1",
          enabled: false,
        },
        { item: "Food", quantity: 40, weight: 1, id: "Food1", enabled: true },
      ],
    });
  });

  it("should toggle off a van load item", () => {
    expect(
      reducer(
        {
          vanLoad: [
            {
              item: "Sheets",
              quantity: 8,
              weight: 1,
              id: "Sheets1",
              enabled: true,
            },
            {
              item: "Food",
              quantity: 40,
              weight: 1,
              id: "Food1",
              enabled: true,
            },
          ],
        },
        {
          type: types.TOGGLE_VAN_LOAD,
          id: "Food1",
        }
      )
    ).toEqual({
      vanLoad: [
        {
          item: "Sheets",
          quantity: 8,
          weight: 1,
          id: "Sheets1",
          enabled: true,
        },
        { item: "Food", quantity: 40, weight: 1, id: "Food1", enabled: false },
      ],
    });
  });
});
