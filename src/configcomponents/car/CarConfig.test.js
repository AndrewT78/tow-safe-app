import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import CarConfig from "./CarConfig";

const emptyStore = createStore(rootReducer, { configs: { carConfig: {} } });
var configuredStore;

beforeEach(() => {
  const initialState = {
    configs: {
      vanConfig: { atm: 2000, tare: 1000, tbm: 100 },
      carConfig: { tare: 2000, gcm: 7000, gvm: 3000 },
    },
    loads: {
      vanLoad: [],
      carLoad: [],
    },
  };
  configuredStore = createStore(rootReducer, initialState);
});

function renderApp(ui, { store = emptyStore, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function renderAppConfiguredStore(
  ui,
  { store = emptyStore, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={configuredStore}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("renders a form for GVM, Tare and GCM", () => {
  renderApp(<CarConfig />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  expect(gvmInput).toBeInTheDocument();

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();

  const gcmInput = screen.getByPlaceholderText("GCM");
  expect(gcmInput).toBeInTheDocument();
});

it("displays the current config in the form", () => {
  renderAppConfiguredStore(<CarConfig />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  expect(gvmInput.value).toBe("3000");

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput.value).toBe("2000");

  const gcmInput = screen.getByPlaceholderText("GCM");
  expect(gcmInput.value).toBe("7000");
});

it("disables the save button until all fields are valid", () => {
  renderApp(<CarConfig />);

  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeDisabled();

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });
  expect(saveButton).toBeDisabled();

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });
  expect(saveButton).toBeDisabled();

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "150" } });
  expect(saveButton).toBeEnabled();
});

it("disables the save button until the form is changed", () => {
  renderAppConfiguredStore(<CarConfig />);

  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeDisabled();

  const atmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(atmInput, { target: { value: "666" } });

  expect(saveButton).toBeEnabled();
});

it("updates the car config when the button is pressed", () => {
  renderApp(<CarConfig />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(emptyStore.getState().configs.carConfig).toEqual({
    gvm: 2000,
    tare: 1000,
    gcm: 3000,
  });
});
