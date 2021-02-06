import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import ManageCarLoad from "./ManageCarLoad";
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
      carLoad: [
        { item: "Engel", quantity: 1, weight: 20, id: "Engel1", enabled: true },
        { item: "Cases", quantity: 4, weight: 18, id: "Cases1", enabled: true },
      ],
      vanLoad: [],
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

it("renders a form for Item, weight and quantity", () => {
  renderApp(<ManageCarLoad />);
  screen.getByPlaceholderText("Item Name");
  screen.getByPlaceholderText("kg");
  screen.getByPlaceholderText("x1");
});

it("renders a list of the load items", () => {
  renderApp(<ManageCarLoad />);
  screen.getByText(/Engel/);
  screen.getByText(/Cases/);
});

it("adds a load item when the add button is pressed", () => {
  renderApp(<ManageCarLoad />);
  const itemInput = screen.getByPlaceholderText("Item Name");
  fireEvent.change(itemInput, { target: { value: "New Item" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "100" } });

  const quantityInput = screen.getByPlaceholderText("x1");
  fireEvent.change(quantityInput, { target: { value: "2" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(myStore.getState().loads.carLoad).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ item: "New Item", quantity: 2, weight: 100 }),
    ])
  );
});

it("deletes a load item when the delete button is pressed", () => {
  renderApp(<ManageCarLoad />);
  screen.getByText(/Engel/);
  const deleteButton = screen.getByTestId("delete-load-Engel1");
  fireEvent.click(deleteButton);

  // confirm on the dialog
  const confirmButton = screen.getByTestId("confirm-delete-button");
  fireEvent.click(confirmButton);

  expect(myStore.getState().loads.carLoad).toEqual([
    { item: "Cases", quantity: 4, weight: 18, id: "Cases1", enabled: true },
  ]);
  expect(screen.queryByText(/Engel/i)).toBeNull();
});

it("moves a load item to the van when the move button is pressed", () => {
  renderApp(<ManageCarLoad />);
  const moveButton = screen.getByTestId("move-load-Engel1");
  fireEvent.click(moveButton);

  const confirmButton = screen.getByTestId("confirm-move-button");
  fireEvent.click(confirmButton);

  expect(myStore.getState().loads.carLoad).toEqual([
    { item: "Cases", quantity: 4, weight: 18, id: "Cases1", enabled: true },
  ]);

  expect(myStore.getState().loads.vanLoad).toEqual([
    { item: "Engel", quantity: 1, weight: 20, id: "Engel1", enabled: true },
  ]);
});

it("toggles a load item when the toggle button is pressed", () => {
  renderApp(<ManageCarLoad />);
  const toggleButton = screen.getByTestId("enabled-toggle-load-Engel1");
  fireEvent.click(toggleButton);

  expect(myStore.getState().loads.carLoad).toEqual([
    { item: "Engel", quantity: 1, weight: 20, id: "Engel1", enabled: false },
    { item: "Cases", quantity: 4, weight: 18, id: "Cases1", enabled: true },
  ]);
});

it("navigates back to the main page when back is clicked", () => {
  renderApp(<ManageCarLoad />);
  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});

it("shows that you are managing the car load", () => {
  renderApp(<ManageCarLoad />);
  screen.getByText("Manage your car payload");
});
