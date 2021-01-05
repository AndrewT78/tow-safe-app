import {getVanConfig} from "./selectors";
import {getCarConfig} from "./selectors";
import {getCarStatus} from "./selectors";
import {status} from "./statusConstants";

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

describe('Car selectors', () => {

  const store = {
      configs: {
          carConfig: {
              tare: 1500,
              gvm: 2000,
              gcm: 3000
          }
      }
  };

  const storeWarning = {
    configs: {
      carConfig: {
          tare: 900,
          gvm: 1000,
          gcm: 3000
      }
  }
  }

  const storeError = {
    configs: {
      carConfig: {
          tare: 1001,
          gvm: 1000,
          gcm: 3000
      }
  }
  }


it('should return the car config from the store', () => {
  expect(getCarConfig(store)).toEqual({ tare: 1500, gvm: 2000, gcm: 3000});
});

it('should return the totalWeight of the car', () => {
  expect(getCarStatus(store).totalWeight).toEqual(1500);
});

it('should return the remaining payload of the car', () => {
  expect(getCarStatus(store).remainingPayload).toEqual(500);
});

it('should return a status of OK when the weight is less than the warning threshold', () => {
  expect(getCarStatus(store).status).toEqual(status.OK);
});

it('should return a status of WARNING when the weight is above the warning threshold', () => {
  expect(getCarStatus(storeWarning).status).toEqual(status.WARNING);
});

it('should return a status of OVER when the weight is above the GVM', () => {
  expect(getCarStatus(storeError).status).toEqual(status.OVER);
});

});
