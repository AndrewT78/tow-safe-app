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

it("routes to the vansetup page when the van has not been setup", () => {
  renderApp(<MainPane />, {
    initialState: { configs: { vanConfig: {}, carConfig: {} } },
  });
  screen.getByText(/Let's start by setting up your van details/);
});

it("routes to the carsetup page when the van has not been setup", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 100, atm: 100, tbm: 50 },
        carConfig: {},
      },
    },
  });
  screen.getByText(/Now let's setup your tow vehicle/);
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

it("shows the car config when the route specifies car config", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
      },
    },
    initialRoute: "/carconfig",
  });

  const carGCMInput = screen.getByPlaceholderText("GCM");
  expect(carGCMInput).toBeInTheDocument();
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

it("navigates to the car detail page when the route specifies", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
      },
    },
    initialRoute: "/cardetail",
  });

  screen.getByTestId("car-detail-status-box");
});
