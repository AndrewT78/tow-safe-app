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