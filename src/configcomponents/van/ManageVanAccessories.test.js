import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import ManageVanAccessories from "./ManageVanAccessories";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

var myStore;
var initialState;
const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

beforeEach(() => {
  initialState = {
    configs: {
      vanConfig: { atm: 3000, tare: 2000, tbm: 200 },
      carConfig: { tare: 2000, gcm: 7000, gvm: 3000 },
    },
    loads: {
      carLoad: [],
      vanLoad: [],
    },
    accessories: {
      carAccessories: [],
      vanAccessories: [
        { accessory: "Gas", weight: 18, id: "Gas1" },
        { accessory: "Annex", weight: 30, id: "Annex1" },
      ],
    },
  };
  myStore = createStore(rootReducer, initialState);
});

function renderApp(
  ui,
  { initialState, store = myStore, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("renders a form for Accessory and weight", () => {
  renderApp(<ManageVanAccessories />);
  screen.getByPlaceholderText("Accessory");
  screen.getByPlaceholderText("kg");
});

it("renders a list of the accesories", () => {
  renderApp(<ManageVanAccessories />);
  screen.getByText(/Annex/);
  screen.getByText(/Gas/);
});

it("adds an accessory when the add button is pressed", () => {
  renderApp(<ManageVanAccessories />);
  const accInput = screen.getByPlaceholderText("Accessory");
  fireEvent.change(accInput, { target: { value: "Battery" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "23" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.vanAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ accessory: "Battery", weight: 23 }),
    ])
  );
});

it("deletes an accessory when the delete button is pressed", () => {
  renderApp(<ManageVanAccessories />);
  screen.getByText(/Annex/);
  const deleteButton = screen.getByTestId("delete-acc-Annex1");
  fireEvent.click(deleteButton);

  // confirm on the dialog
  const confirmButton = screen.getByTestId("confirm-delete-button");
  fireEvent.click(confirmButton);

  expect(myStore.getState().accessories.vanAccessories).toEqual([
    { accessory: "Gas", weight: 18, id: "Gas1" },
  ]);
  expect(screen.queryByText(/Annex/i)).toBeNull();
});
