import {
  render as rtlRender,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

xit("don't do much", () => {
  fail();
});
