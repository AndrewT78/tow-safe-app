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