import {getVanConfig} from "./selectors";
import {getCarConfig} from "./selectors";
import {getCarStatus} from "./selectors";
import {getVanStatus} from "./selectors";
import {getCombinedStatus} from "./selectors";
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

describe('Combined selectors', () => {

  const store = {
    configs: {
        carConfig: {
            tare: 3000,
            gvm: 3500,
            gcm: 7000
        },
        vanConfig: {
          tare: 2000,
          atm: 3000,
          tbm: 180
        }
    }    
  };

  const atGvmThresholdStore = {
    configs: {
        carConfig: {
            tare: 1700,
            gvm: 2000,
            gcm: 10000
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 100
        }
    }    
  };

  const aboveGvmThresholdStore = {
    configs: {
        carConfig: {
            tare: 1701,
            gvm: 2000,
            gcm: 10000
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 100
        }
    }    
  };

  const atGvmStore = {
    configs: {
        carConfig: {
            tare: 1700,
            gvm: 2000,
            gcm: 10000
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 300
        }
    }    
  };

  const overGvmStore = {
    configs: {
        carConfig: {
            tare: 1701,
            gvm: 2000,
            gcm: 10000
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 300
        }
    }    
  };

  const atGcmThresholdStore = {
    configs: {
        carConfig: {
            tare: 7000,
            gvm: 8000,
            gcm: 10000
        },
        vanConfig: {
          tare: 2000,
          atm: 7000,
          tbm: 300
        }
    }    
  };

  const overGcmThresholdStore = {
    configs: {
      carConfig: {
        tare: 7001,
        gvm: 8000,
        gcm: 10000
    },
    vanConfig: {
      tare: 2000,
      atm: 7000,
      tbm: 300
    }
    }    
  };

  const atGcmStore = {
    configs: {
      carConfig: {
        tare: 7000,
        gvm: 8000,
        gcm: 10000
    },
    vanConfig: {
      tare: 3000,
      atm: 7000,
      tbm: 300
    }
    }    
  };

  const overGcmStore = {
    configs: {
      carConfig: {
        tare: 7001,
        gvm: 8000,
        gcm: 10000
    },
    vanConfig: {
      tare: 3000,
      atm: 7000,
      tbm: 300
    }
    }    
  };

  it('should add the tbm to the car gvm', () => {
    expect(getCombinedStatus(store).totalCarWeight).toEqual(3180);
  });

  it('should add the car weight and trailer weight to calculate the combined mass', () => {
    expect(getCombinedStatus(store).totalCombinedWeight).toEqual(5000);
  });

  it('should return warning when the combined car weight is over the gvm warning threshold', () => {
    expect(getCombinedStatus(aboveGvmThresholdStore).carStatus).toEqual(status.WARNING);
  });

  it('should return warning when the combined car weight is at the gvm warning threshold', () => {
    expect(getCombinedStatus(atGvmThresholdStore).carStatus).toEqual(status.WARNING);
  });

  it('should return warning when the combined car weight is equal to the gvm', () => {
    expect(getCombinedStatus(atGvmStore).carStatus).toEqual(status.WARNING);
  });

  it('should return over when the combined car weight is over the gvm', () => {
    expect(getCombinedStatus(overGvmStore).carStatus).toEqual(status.OVER);
  });

  it('should return warning when the combined weight is at the gcm threshold', () => {
    expect(getCombinedStatus(atGcmThresholdStore).combinedStatus).toEqual(status.WARNING);
  });

  it('should return warning when the combined weight is over the gcm threshold', () => {
    expect(getCombinedStatus(overGcmThresholdStore).combinedStatus).toEqual(status.WARNING);
  });

  it('should return warning when the combined weight is at the gcm', () => {
    expect(getCombinedStatus(atGcmStore).combinedStatus).toEqual(status.WARNING);
  });

  it('should return over when the combined weight is over the gcm', () => {
    expect(getCombinedStatus(overGcmStore).combinedStatus).toEqual(status.OVER);
  });    
});