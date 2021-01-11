import {
  ADD_CAR_LOAD,
  ADD_VAN_LOAD,
  DELETE_CAR_LOAD,
  DELETE_VAN_LOAD,
  TOGGLE_VAN_LOAD,
  TOGGLE_CAR_LOAD,
  MOVE_LOAD_TO_VAN,
  MOVE_LOAD_TO_CAR,
} from "../actionTypes";

const initialState = {
  carLoad: [],
  vanLoad: [],
};

function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}

function removeLoadItem(loadArray, id) {
  var index = loadArray.findIndex((l) => l.id === id);

  return [
    ...loadArray.slice(0, index),
    ...loadArray.slice(index + 1, loadArray.length),
  ];
}

function toggleLoadItem(loadArray, id) {
  var index = loadArray.findIndex((l) => l.id === id);
  var item = loadArray[index];
  item.enabled = !item.enabled;

  var newArray = loadArray.slice(0, index);
  newArray.push(item);
  newArray = newArray.concat(loadArray.slice(index + 1, loadArray.length));

  return newArray;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CAR_LOAD: {
      action.load.id = guid();
      action.load.enabled = true;

      return {
        ...state,
        carLoad: [action.load].concat(state.carLoad),
      };
    }
    case ADD_VAN_LOAD: {
      action.load.id = guid();
      action.load.enabled = true;

      return {
        ...state,
        vanLoad: [action.load].concat(state.vanLoad),
      };
    }
    case DELETE_CAR_LOAD: {
      return {
        ...state,
        carLoad: removeLoadItem(state.carLoad, action.id),
      };
    }
    case TOGGLE_CAR_LOAD: {
      return {
        ...state,
        carLoad: toggleLoadItem(state.carLoad, action.id),
      };
    }
    case DELETE_VAN_LOAD: {
      return {
        ...state,
        vanLoad: removeLoadItem(state.vanLoad, action.id),
      };
    }
    case TOGGLE_VAN_LOAD: {
      return {
        ...state,
        vanLoad: toggleLoadItem(state.vanLoad, action.id),
      };
    }
    case MOVE_LOAD_TO_CAR: {
      var index = state.vanLoad.findIndex((l) => l.id === action.id);
      var item = state.vanLoad[index];

      return {
        ...state,
        carLoad: [item].concat(state.carLoad),
        vanLoad: removeLoadItem(state.vanLoad, action.id),
      };
    }
    case MOVE_LOAD_TO_VAN: {
      var index = state.carLoad.findIndex((l) => l.id === action.id);
      var item = state.carLoad[index];

      return {
        ...state,
        carLoad: removeLoadItem(state.carLoad, action.id),
        vanLoad: [item].concat(state.vanLoad),
      };
    }
    default:
      return state;
  }
}
