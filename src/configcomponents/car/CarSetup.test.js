import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import CarSetup from "./CarSetup";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

var myStore;

var initialState;

const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

beforeEach(() => {
  initialState = {
    configs: {
      vanConfig: {},
      carConfig: {},
    },
    loads: {
      vanLoad: [],
      carLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [],
    },
  };
  myStore = createStore(rootReducer, initialState);
});

function renderApp(ui, { store = myStore, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("renders a form for the car config", () => {
  renderApp(<CarSetup />);
  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();
});

it("can update the car config", () => {
  renderApp(<CarSetup />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(myStore.getState().configs.carConfig).toEqual({
    gvm: 2000,
    tare: 1000,
    gcm: 3000,
  });
});

it("shows the accessories setup once the config has been saved", () => {
  renderApp(<CarSetup />);
  expect(screen.queryByText(/Skip/i)).toBeNull();

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  screen.getByText("Skip");
});

it("hides the config setup once the config is saved", () => {
  renderApp(<CarSetup />);

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(screen.queryByPlaceholderText("GVM")).toBeNull();
});

it("goes back to the main screen when skip is pressed", () => {
  renderApp(<CarSetup />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const skipButton = screen.getByText("Skip");
  fireEvent.click(skipButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});
