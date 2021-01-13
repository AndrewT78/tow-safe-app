import { createStore } from "redux";
import rootReducer from "./reducers";
import { loadState, saveState } from "./storeSaver";

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  console.log("Saving store");
  saveState(store.getState());
});

export default store;
