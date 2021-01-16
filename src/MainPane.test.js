import {
  render as rtlRender,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
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
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("renders the form to configure the van config when no config exists", () => {
  renderApp(<MainPane />);
  const vanATMInput = screen.getByPlaceholderText("ATM");
  expect(vanATMInput).toBeInTheDocument();
});

it("renders the form to configure the car config when no car config exists", () => {
  renderApp(<MainPane />, {
    initialState: { configs: { vanConfig: { atm: 1234 } } },
  });
  const carGVMInput = screen.getByPlaceholderText("GVM");
  expect(carGVMInput).toBeInTheDocument();
});

it("shows the status panels when the car and van have been configured", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
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

xit("shows the van config when the route specifies van config", () => {
  fail();
});

it("navigates to the van load page when the van load button is clicked", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300, tbm: 180 },
        carConfig: { tare: 1000, gvm: 2200, gcm: 7000 },
      },
    },
  });
  const loadButton = screen.getByTestId("van-manage-load");
  act(() => {
    fireEvent.click(loadButton);
  });

  const manageLoadScreen = screen.getByPlaceholderText("Item Name");
  expect(manageLoadScreen).toBeInTheDocument();
});

xit("navigates to the car load page when the car load button is clicked", () => {
  renderApp(<MainPane />, {
    initialState: {
      configs: {
        vanConfig: { tare: 2150, atm: 3300 },
        carConfig: { tare: 1000, gvm: 2200 },
      },
    },
  });
  const loadButton = screen.getByTestId("car-manage-load");
  act(() => {
    fireEvent.click(loadButton);
  });

  const manageLoadScreen = screen.getByPlaceholderText("Item Name");
  expect(manageLoadScreen).toBeInTheDocument();
});
