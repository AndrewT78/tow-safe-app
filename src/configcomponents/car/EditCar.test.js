import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import EditCar from "./EditCar";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

var myStore;

var initialState;

const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

beforeEach(() => {
  initialState = {
    configs: {
      vanConfig: { atm: 2000, tare: 1000, tbm: 100 },
      carConfig: { tare: 2000, gcm: 7000, gvm: 3000 },
    },
    loads: {
      vanLoad: [],
      carLoad: [],
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
  renderApp(<EditCar />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  expect(gvmInput).toBeInTheDocument();

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();

  const gcmInput = screen.getByPlaceholderText("GCM");
  expect(gcmInput).toBeInTheDocument();
});

it("can update the car config", () => {
  renderApp(<EditCar />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "8000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(myStore.getState().configs.carConfig).toEqual({
    gvm: 2000,
    tare: 1000,
    gcm: 8000,
  });
});

it("goes back to the main screen when back is pressed", () => {
  renderApp(<EditCar />);
  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});
