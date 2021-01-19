import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import ManageCarAccessories from "./ManageCarAccessories";
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
      carAccessories: [
        { accessory: "Roof Racks", weight: 18, id: "Roofrack1" },
        { accessory: "Bullbar", weight: 80, id: "Bullbar1" },
      ],
      vanAccessories: [],
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
  renderApp(<ManageCarAccessories />);
  screen.getByPlaceholderText("Accessory");
  screen.getByPlaceholderText("kg");
});

it("renders a list of the accesories", () => {
  renderApp(<ManageCarAccessories />);
  screen.getByText(/Bullbar/);
  screen.getByText(/Roof Racks/);
});

it("adds an accessory when the add button is pressed", () => {
  renderApp(<ManageCarAccessories />);
  const accInput = screen.getByPlaceholderText("Accessory");
  fireEvent.change(accInput, { target: { value: "Snorkel" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "12" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.carAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ accessory: "Snorkel", weight: 12 }),
    ])
  );
});

it("deletes an accessory when the delete button is pressed", () => {
  renderApp(<ManageCarAccessories />);
  screen.getByText(/Roof Racks/);
  const deleteButton = screen.getByTestId("delete-acc-Roofrack1");
  fireEvent.click(deleteButton);

  // confirm on the dialog
  const confirmButton = screen.getByTestId("confirm-delete-button");
  fireEvent.click(confirmButton);

  expect(myStore.getState().accessories.carAccessories).toEqual([
    { accessory: "Bullbar", weight: 80, id: "Bullbar1" },
  ]);
  expect(screen.queryByText(/Roof Racks/i)).toBeNull();
});
