import {getVanConfig} from "./selectors";
import {getCarConfig} from "./selectors";

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

describe('Car config selectors', () => {

  const store = {
      configs: {
          carConfig: {
              tare: 1000,
              gvm: 2000,
              gcm: 3000
          }
      }
  };


it('should return the car config from the store', () => {
  expect(getCarConfig(store)).toEqual({ tare: 1000, gvm: 2000, gcm: 3000});
});
});
