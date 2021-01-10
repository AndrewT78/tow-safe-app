import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
import { createStore } from "redux";
import ManageVanLoad from "./ManageVanLoad";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

var myStore;
const initialState = {
  configs: {
    vanConfig: { atm: 3000, tare: 2000, tbm: 200 },
    carConfig: { tare: 2000, gcm: 7000, gvm: 3000 },
  },
  loads: {
    vanLoad: [
      { item: "Sheets", quantity: 8, weight: 3, id: "Sheets1" },
      { item: "Cases", quantity: 4, weight: 18, id: "Cases1" },
    ],
    carLoad: [],
  },
};
const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

beforeEach(() => {
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
  renderApp(<ManageVanLoad />);
  screen.getByPlaceholderText("Item Name");
  screen.getByPlaceholderText("kg");
  screen.getByPlaceholderText("Quantity");
});

it("renders a list of the load items", () => {
  renderApp(<ManageVanLoad />);
  screen.getByText(/Sheets/);
  screen.getAllByText(/8/);
  screen.getByText(/3/);
  screen.getByText(/Cases/);
});

it("adds a load item when the add button is pressed", () => {
  renderApp(<ManageVanLoad />);
  const itemInput = screen.getByPlaceholderText("Item Name");
  fireEvent.change(itemInput, { target: { value: "Books" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "2" } });

  const quantityInput = screen.getByPlaceholderText("Quantity");
  fireEvent.change(quantityInput, { target: { value: "8" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(myStore.getState().loads.vanLoad).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ item: "Books", quantity: 8, weight: 2 }),
    ])
  );
});

it("deletes a load item when the delete button is pressed", () => {
  renderApp(<ManageVanLoad />);
  screen.getByText(/Sheets/);
  const deleteButton = screen.getByTestId("delete-load-Sheets1");
  fireEvent.click(deleteButton);

  expect(myStore.getState().loads.vanLoad).toEqual([
    { item: "Cases", quantity: 4, weight: 18, id: "Cases1" },
  ]);
  expect(screen.queryByText(/Sheets/i)).toBeNull();
});

it("navigates back to the main page when back is clicked", () => {
  renderApp(<ManageVanLoad />);
  const backButton = screen.getByText("Back");
  fireEvent.click(backButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});

it("shows that you are managing the van load", () => {
  renderApp(<ManageVanLoad />);
  screen.getByText("Manage your van payload");
});
