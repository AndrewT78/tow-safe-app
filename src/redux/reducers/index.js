import { combineReducers } from "redux";
import configs from "./configs";
import loads from "./loads";
import accessories from "./accessories";

export default combineReducers({ configs, loads, accessories });
