import {getVanConfig} from "./selectors";
import {getCarConfig} from "./selectors";
import {getCarStatus} from "./selectors";
import {getVanStatus} from "./selectors";
import {status} from "./statusConstants";

describe('Van selectors', () => {

    const store = {
        configs: {
            vanConfig: {
                tare: 2150,
                atm: 3300,
                tbm: 180
            }
        }
    };

    const storeWarning = {
      configs: {
          vanConfig: {
              tare: 1800,
              atm: 2000,
              tbm: 180
          }
      }
  };

  const storeError = {
    configs: {
        vanConfig: {
            tare: 2001,
            atm: 2000,
            tbm: 180
        }
    }
};

    it('should return the totalWeight of the van', () => {
      expect(getVanStatus(store).totalWeight).toEqual(2150);
    });
    
    it('should return the remaining payload of the van', () => {
      expect(getVanStatus(store).remainingPayload).toEqual(1150);
    });
    
    it('should return a status of OK when the weight is less than the warning threshold', () => {
      expect(getVanStatus(store).status).toEqual(status.OK);
    });
    
    it('should return a status of WARNING when the weight is above the warning threshold', () => {
      expect(getVanStatus(storeWarning).status).toEqual(status.WARNING);
    });
    
    it('should return a status of OVER when the weight is above the GVM', () => {
      expect(getVanStatus(storeError).status).toEqual(status.OVER);
    });
  

  it('should return the van config from the store', () => {
    expect(getVanConfig(store)).toEqual({ atm: 3300, tare: 2150, tbm: 180});
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
