import * as actions from './actions'
import * as types from './actionTypes'

describe('Van Config Actions', () => {
    it('should create an action to update the van config', () => {
      const config = { atm : 220, tare: 100, tbm: 10}
      const expectedAction = {
        type: types.UPDATE_VAN_CONFIG,
        config
      }
      expect(actions.updateVanConfig(config)).toEqual(expectedAction)
    })
  })

  describe('Car Config Actions', () => {
    it('should create an action to update the car config', () => {
      const config = { gvm : 1000, tare: 100, gcm: 2000}
      const expectedAction = {
        type: types.UPDATE_CAR_CONFIG,
        config
      }
      expect(actions.updateCarConfig(config)).toEqual(expectedAction)
    })
  })

  describe('Car Load Actions', () => {
    it('should create an action to add a car load item', () => {
      const load = { item: 'Food', quantity: 10, weight: 8}
      const expectedAction = {
        type: types.ADD_CAR_LOAD,
        load
      }
      expect(actions.addCarLoad(load)).toEqual(expectedAction)
    })
  })

  describe('Van Load Actions', () => {
    it('should create an action to add a van load item', () => {
      const load = { item: 'Sheets', quantity: 10, weight: 8}
      const expectedAction = {
        type: types.ADD_VAN_LOAD,
        load
      }
      expect(actions.addVanLoad(load)).toEqual(expectedAction)
    })
    
  })