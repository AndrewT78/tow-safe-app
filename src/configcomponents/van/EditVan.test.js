import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import EditVan from "./EditVan";
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

it("renders a form for the van config", () => {
  renderApp(<EditVan />);
  const atmInput = screen.getByPlaceholderText("ATM");
  expect(atmInput).toBeInTheDocument();

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();

  const tbmInput = screen.getByPlaceholderText("TBM");
  expect(tbmInput).toBeInTheDocument();
});

it("can update the van config", () => {
  renderApp(<EditVan />);
  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(myStore.getState().configs.vanConfig).toEqual({
    atm: 2000,
    tare: 1000,
    tbm: 150,
  });
});

it("goes back to the main screen when back is pressed", () => {
  renderApp(<EditVan />);
  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});
