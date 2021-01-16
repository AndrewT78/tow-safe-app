import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import VanConfig from "./VanConfig";

const emptyStore = createStore(rootReducer, { configs: { vanConfig: {} } });
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

it("renders a form for ATM, Tare and TBM", () => {
  renderApp(<VanConfig />);
  const atmInput = screen.getByPlaceholderText("ATM");
  expect(atmInput).toBeInTheDocument();

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();

  const tbmInput = screen.getByPlaceholderText("TBM");
  expect(tbmInput).toBeInTheDocument();
});

it("displays the current config in the form", () => {
  renderAppConfiguredStore(<VanConfig />);
  const atmInput = screen.getByPlaceholderText("ATM");
  expect(atmInput.value).toBe("2000");

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput.value).toBe("1000");

  const tbmInput = screen.getByPlaceholderText("TBM");
  expect(tbmInput.value).toBe("100");
});

it("disables the save button until all fields are valid", () => {
  renderApp(<VanConfig />);

  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeDisabled();

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });
  expect(saveButton).toBeDisabled();

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });
  expect(saveButton).toBeDisabled();

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });
  expect(saveButton).toBeEnabled();
});

it("disables the save button until the form is changed", () => {
  renderAppConfiguredStore(<VanConfig />);

  const saveButton = screen.getByText("Save");
  expect(saveButton).toBeDisabled();

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "666" } });

  expect(saveButton).toBeEnabled();
});

it("updates the van config when the button is pressed", () => {
  renderApp(<VanConfig />);
  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(emptyStore.getState().configs.vanConfig).toEqual({
    atm: 2000,
    tare: 1000,
    tbm: 150,
  });
});
