import { render as rtlRender, screen, cleanup } from "@testing-library/react";
import MainPane from "./MainPane";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
});

function renderApp(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    initialRoute = "/",
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("renders the form to configure the van config when no config exists", () => {
  renderApp(<MainPane />), { initialState: { vanConfig: {}, carConfig: {} } };
  const vanATMInput = screen.getByPlaceholderText("ATM");
  expect(vanATMInput).toBeInTheDocument();
});

it("renders the form to configure the car config when no car config exists", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { atm: 1234, tbm: 100, tare: 1000 },
        carConfig: {},
      },
    },
  });
  const carGVMInput = screen.getByPlaceholderText("GVM");
  expect(carGVMInput).toBeInTheDocument();
});

it("shows the status panels when the car and van have been configured", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300, tbm: 100 },
        carConfig: { tare: 1000, gvm: 2200, gcm: 7000 },
      },
    },
  });
  const carTareDisplay = screen.getByText(/1000/);
  expect(carTareDisplay).toBeInTheDocument();
  const vanTareDisplay = screen.getByText(/2150/);
  expect(vanTareDisplay).toBeInTheDocument();
  const combinedTotalDisplay = screen.getByText(/3150/);
  expect(combinedTotalDisplay).toBeInTheDocument();
});

it("shows the van config when the route specifies van config", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
      },
    },
    initialRoute: "/vanconfig",
  });

  const vanATMInput = screen.getByPlaceholderText("ATM");
  expect(vanATMInput).toBeInTheDocument();
});

it("navigates to the van load page when the route specifies", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
      },
    },
    initialRoute: "/vanload",
  });

  screen.getByText("Manage your van payload");
});

it("navigates to the car load page when the route specifies", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
      },
    },
    initialRoute: "/carload",
  });

  screen.getByText("Manage your car payload");
});
