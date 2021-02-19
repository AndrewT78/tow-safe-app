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
import { Router } from "react-router-dom";

var myStore;

var initialState;

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
    return <Provider store={store}>{children}</Provider>;
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

  var button = screen.getByText("Make");

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
