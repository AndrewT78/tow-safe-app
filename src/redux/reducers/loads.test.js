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
      }).carLoad
    ).toEqual(expect.arrayContaining([expect.objectContaining({ item: 'Weber', quantity: 1, weight: 20 })]));
  });

  it('should prepend a second load to the car', () => {

    expect(
      reducer({carLoad: [{item: "Engel", quantity: 1, weight: 25}]}, {
        type: types.ADD_CAR_LOAD,
        load: { item: 'Weber', quantity: 1, weight: 20 }
      }).carLoad).toHaveLength(2);

    expect(
      reducer({carLoad: [{item: "Engel", quantity: 1, weight: 25}]}, {
        type: types.ADD_CAR_LOAD,
        load: { item: 'Weber', quantity: 1, weight: 20 }
      }).carLoad[0]
    ).toEqual(expect.objectContaining(
      {
        item: 'Weber', quantity: 1, weight: 20
      }
    )
    )

  });

  it('should add a load item to the van', () => {
    expect(
      reducer({vanLoad: []}, {
        type: types.ADD_VAN_LOAD,
        load: { item: 'Pots & Pans', quantity: 5, weight: 2 }
      }).vanLoad
    ).toEqual(expect.arrayContaining([expect.objectContaining({ item: 'Pots & Pans', quantity: 5, weight: 2 })]));

  });

  it('should prepend a second load to the van', () => {
    expect(
      reducer({vanLoad: [{item: "Pots & Pans", quantity: 5, weight: 2}]}, {
        type: types.ADD_VAN_LOAD,
        load: { item: 'Sheets', quantity: 8, weight: 1 }
      }).vanLoad).toHaveLength(2);

    expect(
      reducer({vanLoad: [{item: "Pots & Pans", quantity: 5, weight: 2}]}, {
        type: types.ADD_VAN_LOAD,
        load: { item: 'Sheets', quantity: 8, weight: 1 }
      }).vanLoad[0]
    ).toEqual(expect.objectContaining(
      {
        item: 'Sheets', quantity: 8, weight: 1
      }
    )
    )
  });
});