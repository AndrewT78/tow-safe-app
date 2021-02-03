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

  var accessoryNameFields = screen.getAllByPlaceholderText("Accessory");
  expect(accessoryNameFields[0].value).toBe("Bullbar");
});

it("adds an accessory to the car", () => {
  renderApp(<CarSetup />);

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const addButton = screen.getAllByTestId("btn-acc-off")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.carAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accessory: "Bullbar",
        weight: 80,
        id: "WizardBullbar",
      }),
    ])
  );
});

it("removes an accessory from the car", () => {
  renderApp(<CarSetup />);

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const addButton = screen.getAllByTestId("btn-acc-off")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.carAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accessory: "Bullbar",
        weight: 80,
        id: "WizardBullbar",
      }),
    ])
  );

  const removeButton = screen.getAllByTestId("btn-acc-on")[0];
  fireEvent.click(removeButton);

  expect(myStore.getState().accessories.carAccessories).toHaveLength(0);
});

it("shows the load setup when the user moves to load", () => {
  renderApp(<CarSetup />);

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const loadButton = screen.getByText("Next: Load");
  fireEvent.click(loadButton);

  var accessoryNameFields = screen.getAllByPlaceholderText("Item Name");
  expect(accessoryNameFields[0].value).toBe("Adult Pass");
});

it("adds load to the car", () => {
  renderApp(<CarSetup />);

  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const loadButton = screen.getByText("Next: Load");
  fireEvent.click(loadButton);

  const addButton = screen.getAllByText("Add")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().loads.carLoad).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ item: "Adult Pass", weight: 75, quantity: 2 }),
    ])
  );
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

it("goes back to the main screen when 'Done' is pressed", () => {
  renderApp(<CarSetup />);
  const gvmInput = screen.getByPlaceholderText("GVM");
  fireEvent.change(gvmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const gcmInput = screen.getByPlaceholderText("GCM");
  fireEvent.change(gcmInput, { target: { value: "3000" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const skipButton = screen.getByText("Done");
  fireEvent.click(skipButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});

it("presets to on the accessories already added in the wizard", () => {
  initialState.configs.carConfig = { tare: 2000, gcm: 3000, gvm: 200 };
  initialState.accessories.carAccessories = [
    { accessory: "BullbarEdited", weight: 75, id: "WizardBullbar" },
  ];

  renderApp(<CarSetup />);

  const addButtons = screen.getAllByTestId("btn-acc-off");
  const deleteButtons = screen.getAllByTestId("btn-acc-on");

  expect(addButtons).toHaveLength(3);
  expect(deleteButtons).toHaveLength(1);

  const nameFields = screen.getAllByPlaceholderText("Accessory");
  expect(nameFields[0].value).toBe("BullbarEdited");
});
