import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import VanSetup from "./VanSetup";
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
  expect(accessoryNameFields[0].value).toBe("Gas Bottle(s)");
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

  const addButton = screen.getAllByText("+")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.vanAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accessory: "Gas Bottle(s)",
        weight: 18,
        id: "WizardGas1",
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

  const addButton = screen.getAllByText("+")[0];
  fireEvent.click(addButton);

  expect(myStore.getState().accessories.vanAccessories).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        accessory: "Gas Bottle(s)",
        weight: 18,
        id: "WizardGas1",
      }),
    ])
  );

  const removeButton = screen.getAllByText("-")[0];
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

  var accessoryNameFields = screen.getAllByPlaceholderText("Item Name");
  expect(accessoryNameFields[0].value).toBe("Case");
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
      expect.objectContaining({ item: "Case", weight: 20, quantity: 2 }),
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
    { accessory: "AnnexEdited", weight: 30, id: "WizardAnnex1" },
  ];

  renderApp(<VanSetup />);

  const addButtons = screen.getAllByText("+");
  const deleteButtons = screen.getAllByText("-");

  expect(addButtons).toHaveLength(1);
  expect(deleteButtons).toHaveLength(1);

  const nameFields = screen.getAllByPlaceholderText("Accessory");
  expect(nameFields[0].value).toBe("Gas Bottle(s)");
  expect(nameFields[1].value).toBe("AnnexEdited");
});
