import reducer from './loads'
import * as types from '../actionTypes'

describe('loads reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        carLoad: [],
        vanLoad: []
      }
    )
  })

  it('should add a load item to the car', () => {
    expect(
      reducer({carLoad: []}, {
        type: types.ADD_CAR_LOAD,
        load: { item: 'Weber', quantity: 1, weight: 20 }
      })
    ).toEqual(
      {
        carLoad: [{ item: 'Weber', quantity: 1, weight: 20 }]
      }
    )

  });

  it('should prepend a second load to the car', () => {
    expect(
      reducer({carLoad: [{item: "Engel", quantity: 1, weight: 25}]}, {
        type: types.ADD_CAR_LOAD,
        load: { item: 'Weber', quantity: 1, weight: 20 }
      })
    ).toEqual(
      {
        carLoad: [{ item: 'Weber', quantity: 1, weight: 20 }, {item: "Engel", quantity: 1, weight: 25}]
      }
    )

  });

  it('should add a load item to the van', () => {
    expect(
      reducer({vanLoad: []}, {
        type: types.ADD_VAN_LOAD,
        load: { item: 'Sheets', quantity: 8, weight: 2 }
      })
    ).toEqual(
      {
        vanLoad: [{ item: 'Sheets', quantity: 8, weight: 2 }]
      }
    )

  });

  it('should prepend a second load to the van', () => {
    expect(
      reducer({vanLoad: [{item: "Sheets", quantity: 8, weight: 2}]}, {
        type: types.ADD_VAN_LOAD,
        load: { item: 'Books', quantity: 5, weight: 1 }
      })
    ).toEqual(
      {
        vanLoad: [{ item: 'Books', quantity: 5, weight: 1 }, {item: "Sheets", quantity: 8, weight: 2}]
      }
    )

  });
});