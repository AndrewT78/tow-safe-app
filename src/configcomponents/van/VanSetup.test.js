import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import VanSetup from "./VanSetup";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import vanSetupWizard from "./VanSetupWizardTypes.json";

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

it("renders a form for the van config", () => {
  renderApp(<VanSetup />);
  const atmInput = screen.getByPlaceholderText("ATM");
  expect(atmInput).toBeInTheDocument();

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();

  const tbmInput = screen.getByPlaceholderText("TBM");
  expect(tbmInput).toBeInTheDocument();
});

it("can update the van config", () => {
  renderApp(<VanSetup />);
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

it("shows the accessories setup once the config has been saved", () => {
  renderApp(<VanSetup />);

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  var accessoryNameFields = screen.getAllByPlaceholderText("Accessory");
  expect(accessoryNameFields[0].value).toBe(
    vanSetupWizard.accessories[0].accessory
  );
});

it("adds an accessory to the van", () => {
  renderApp(<VanSetup />);

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const addButton = screen.getAllByTestId("btn-acc-off")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.vanAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accessory: vanSetupWizard.accessories[0].accessory,
        weight: vanSetupWizard.accessories[0].weight,
        id: vanSetupWizard.accessories[0].id,
      }),
    ])
  );
});

it("removes an accessory from the van", () => {
  renderApp(<VanSetup />);

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const addButton = screen.getAllByTestId("btn-acc-off")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.vanAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accessory: vanSetupWizard.accessories[0].accessory,
        weight: vanSetupWizard.accessories[0].weight,
        id: vanSetupWizard.accessories[0].id,
      }),
    ])
  );

  const removeButton = screen.getAllByTestId("btn-acc-on")[0];
  fireEvent.click(removeButton);

  expect(myStore.getState().accessories.vanAccessories).toHaveLength(0);
});

it("shows the load setup when the user moves to load", () => {
  renderApp(<VanSetup />);
  expect(screen.queryByText(/Skip/i)).toBeNull();

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const loadButton = screen.getByText("Next: Load");
  fireEvent.click(loadButton);

  var loadFields = screen.getAllByPlaceholderText("Item Name");
  expect(loadFields[0].value).toBe(vanSetupWizard.load[0].item);
});

it("adds load to the van", () => {
  renderApp(<VanSetup />);

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const loadButton = screen.getByText("Next: Load");
  fireEvent.click(loadButton);

  const addButton = screen.getAllByText("Add")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().loads.vanLoad).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        item: vanSetupWizard.load[0].item,
        weight: vanSetupWizard.load[0].weight,
        quantity: vanSetupWizard.load[0].quantity,
      }),
    ])
  );
});

it("hides the config setup once the config is saved", () => {
  renderApp(<VanSetup />);

  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  expect(screen.queryByPlaceholderText("ATM")).toBeNull();
});

it("goes back to the main screen when 'Done' is pressed", () => {
  renderApp(<VanSetup />);
  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const saveButton = screen.getByText("Save");
  fireEvent.click(saveButton);

  const skipButton = screen.getByText("Done");
  fireEvent.click(skipButton);
  expect(historySpy).toHaveBeenCalledWith("/");
});

it("presets to on the accessories already added in the wizard", () => {
  initialState.configs.vanConfig = { tare: 2000, atm: 3000, tbm: 200 };
  initialState.accessories.vanAccessories = [
    {
      accessory: "EditedItemName",
      weight: 666,
      id: vanSetupWizard.accessories[1].id,
    },
  ];

  renderApp(<VanSetup />);

  const addButtons = screen.getAllByTestId("btn-acc-off");
  const deleteButtons = screen.getAllByTestId("btn-acc-on");

  expect(addButtons.length).toBeGreaterThanOrEqual(2);
  expect(deleteButtons).toHaveLength(1);

  const nameFields = screen.getAllByPlaceholderText("Accessory");
  expect(nameFields[0].value).toBe(vanSetupWizard.accessories[0].accessory);
  expect(nameFields[1].value).toBe("EditedItemName");
});

it("presets to on the load already added in the wizard", () => {
  initialState.configs.vanConfig = { tare: 2000, atm: 3000, tbm: 200 };
  initialState.loads.vanLoad = [
    {
      item: "EditedLoadItem",
      weight: 10,
      quantity: 4,
      id: vanSetupWizard.load[0].id,
    },
  ];

  renderApp(<VanSetup />);

  const loadButton = screen.getByText("Next: Load");
  fireEvent.click(loadButton);

  const addButtons = screen.getAllByTestId("btn-load-off");
  const deleteButtons = screen.getAllByTestId("btn-load-on");

  expect(addButtons.length).toBeGreaterThanOrEqual(2);
  expect(deleteButtons).toHaveLength(1);

  const nameFields = screen.getAllByPlaceholderText("Item Name");
  expect(nameFields[0].value).toBe("EditedLoadItem");
  expect(nameFields[1].value).toBe(vanSetupWizard.load[1].item);
});
