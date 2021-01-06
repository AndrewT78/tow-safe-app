import reducer from './loads'
import * as types from '../actionTypes'

describe('loads reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        carLoad: []
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
});