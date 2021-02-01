import {
  ADD_CAR_ACC,
  ADD_VAN_ACC,
  DELETE_CAR_ACC,
  DELETE_VAN_ACC,
} from "../actionTypes";

const initialState = {
  carAccessories: [],
  vanAccessories: [],
};

function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

function removeAccessoryItem(accArray, id) {
  var index = accArray.findIndex((l) => l.id === id);

  return [
    ...accArray.slice(0, index),
    ...accArray.slice(index + 1, accArray.length),
  ];
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CAR_ACC: {
      if (action.accessory.id === undefined) {
        action.accessory.id = guid();
      }

      return {
        ...state,
        carAccessories: [action.accessory].concat(state.carAccessories),
      };
    }
    case ADD_VAN_ACC: {
      if (action.accessory.id === undefined) {
        action.accessory.id = guid();
      }

      return {
        ...state,
        vanAccessories: [action.accessory].concat(state.vanAccessories),
      };
    }
    case DELETE_CAR_ACC: {
      return {
        ...state,
        carAccessories: removeAccessoryItem(state.carAccessories, action.id),
      };
    }

    case DELETE_VAN_ACC: {
      return {
        ...state,
        vanAccessories: removeAccessoryItem(state.vanAccessories, action.id),
      };
    }

    default:
      return state;
  }
}
