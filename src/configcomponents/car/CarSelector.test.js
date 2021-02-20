import {
  render as rtlRender,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import CarSelector from "./CarSelector";
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

it("Shows a list of all makes", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");
  await screen.findByText("Toyota");
});

it("doesnt show models until I have selected a make", async () => {
  renderApp(<CarSelector />);

  expect(screen.queryByText("Model")).toBeNull();

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  screen.getByText("Model");
});

it("shows a list of models when I have selected a make", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");
  await screen.findByText("Navara");
});

it("doesnt show variants until I have selected a model", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  expect(screen.queryByText("Variant")).toBeNull();

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  screen.getByText("Variant");
});

it("shows a list of variants when I have selected a model", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  var variantButton = screen.getByText("Variant");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText("Y62 S5 Ti");
  await screen.findByText("Y62 S5 TiL");
});

it("clears the variant when make is changed", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  screen.getByText("Variant");

  var button = screen.getAllByText("Nissan")[0];

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Toyota");

  var toyotaButton = screen.getByText("Toyota");
  act(() => {
    fireEvent.click(toyotaButton);
  });

  expect(screen.queryByText("Variant")).toBeNull();
});

it("previews the tare, gvm and gcm when the variant is selected", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  var variantButton = screen.getByText("Variant");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText("Y62 S5 Ti");

  var variantButton = screen.getByText("Y62 S5 Ti");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText(/2715/);
  await screen.findByText(/3500/);
  await screen.findByText(/7000/);
});

it("sets the tare, gvm and gcm when the apply button is pressed", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  var variantButton = screen.getByText("Variant");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText("Y62 S5 Ti");

  var variantButton = screen.getByText("Y62 S5 Ti");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText(/2715/);

  var applyButton = screen.getByText("Apply");
  act(() => {
    fireEvent.click(applyButton);
  });

  expect(myStore.getState().configs.carConfig).toEqual({
    gvm: 3500,
    tare: 2715,
    gcm: 7000,
  });
});

it("navigates back to car setup when complete", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  var variantButton = screen.getByText("Variant");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText("Y62 S5 Ti");

  var variantButton = screen.getByText("Y62 S5 Ti");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText(/2715/);

  var applyButton = screen.getByText("Apply");
  act(() => {
    fireEvent.click(applyButton);
  });

  expect(historySpy).toHaveBeenCalledWith("/carsetup");
});

it("navigates back when back is selected", async () => {
  renderApp(<CarSelector />);

  var cancelButton = screen.getByText("Cancel");
  act(() => {
    fireEvent.click(cancelButton);
  });

  expect(historySpy).toHaveBeenCalledWith("/");
});

it("clears the variant and details when the model is changed", async () => {
  renderApp(<CarSelector />);

  var button = screen.getByText("Make");

  act(() => {
    fireEvent.click(button);
  });

  await screen.findByText("Nissan");

  var nissanButton = screen.getByText("Nissan");
  act(() => {
    fireEvent.click(nissanButton);
  });

  var modelButton = screen.getByText("Model");
  act(() => {
    fireEvent.click(modelButton);
  });

  await screen.findByText("Patrol");

  var patrolButton = screen.getByText("Patrol");
  act(() => {
    fireEvent.click(patrolButton);
  });

  await screen.findByText("Variant");
  var variantButton = screen.getByText("Variant");

  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText("Y62 S5 Ti");

  var variantButton = screen.getByText("Y62 S5 Ti");
  act(() => {
    fireEvent.click(variantButton);
  });

  await screen.findByText("2715");

  var patrolButton = screen.getAllByText("Patrol")[0];
  act(() => {
    fireEvent.click(patrolButton);
  });

  await screen.findByText("Navara");

  var navaraButton = screen.getByText("Navara");
  act(() => {
    fireEvent.click(navaraButton);
  });
  await screen.findByText("Variant");

  expect(screen.queryByText("2715")).toBeNull();
});
