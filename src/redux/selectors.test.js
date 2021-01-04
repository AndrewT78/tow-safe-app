import {getVanConfig} from "./selectors";

describe('Van config selectors', () => {

    const store = {
        configs: {
            vanConfig: {
                tare: 123,
                atm: 456,
                tbm: 13
            }
        }
    };
  

  it('should return the van config from the store', () => {
    expect(getVanConfig(store)).toEqual({ atm: 456, tare: 123, tbm: 13});
  });
});
