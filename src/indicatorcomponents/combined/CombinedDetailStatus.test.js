import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import CombinedDetailStatus from "./CombinedDetailStatus";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { act } from "react-dom/test-utils";

const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

function renderComponent(
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
        <Router history={history}>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("shows the warning about TBM being outside the range", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        vanConfig: { atm: 3000, tare: 2000, tbm: 159 },
        carConfig: { tare: 2000, gvm: 3000, gcm: 7000 },
      },
      loads: {
        vanLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
        carLoad: [],
      },
      accessories: {
        vanAccessories: [
          { accessory: "Gas", weight: 10 },
          { accessory: "Annex", weight: 30 },
        ],
        carAccessories: [],
      },
    },
  });

  screen.getByText(
    "Your Tow Ball Mass is outside of recommendations, its is recommended to keep your TBM approx 10% of your overall van weight. TowSafe App will display this warning when you are outside of the 8-12% range"
  );
});

it("does not show the warning about TBM being outside the rangem if its within range", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        vanConfig: { atm: 3000, tare: 2000, tbm: 200 },
        carConfig: { gcm: 700, tare: 2800, gvm: 3500 },
      },
      loads: {
        vanLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
        carLoad: [],
      },
      accessories: {
        vanAccessories: [
          { accessory: "Gas", weight: 10 },
          { accessory: "Annex", weight: 30 },
        ],
        carAccessories: [],
      },
    },
  });

  expect(screen.queryByText(/Your Tow Ball Mass is outside/i)).toBeNull();
});

it("renders green when combined weight and car combined weight are below the gcm threshold", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: { gvm: 3000, tare: 2000, gcm: 7000 },
        vanConfig: { atm: 3000, tare: 2000, tbm: 200 },
      },
    },
  });
  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders warning when combined weight is above the gcm threshold", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 7001,
          gvm: 8000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 2500,
          atm: 7000,
          tbm: 300,
        },
      },
    },
  });
  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders warning when car combined weight is above the gvm threshold", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 1700,
          gvm: 2000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 201,
        },
      },
    },
  });

  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders warning when tbm is outside of threshold", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 1700,
          gvm: 2000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 159,
        },
      },
    },
  });

  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders over when combined weight is above the gcm", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 7001,
          gvm: 8000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 3000,
          atm: 7000,
          tbm: 300,
        },
      },
    },
  });
  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders over when car combined weight is above the gvm", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 1700,
          gvm: 2000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 2000,
          atm: 5000,
          tbm: 301,
        },
      },
    },
  });

  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders over when combined weight fine, car is fine but van is over ATM", () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 7001,
          gvm: 8000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 3000,
          atm: 2000,
          tbm: 250,
        },
      },
    },
  });
  const alertBox = screen.getByTestId("combined-detail-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("navigates back to the main page when back is clicked", async () => {
  renderComponent(<CombinedDetailStatus />, {
    initialState: {
      configs: {
        carConfig: {
          tare: 7001,
          gvm: 8000,
          gcm: 10000,
        },
        vanConfig: {
          tare: 3000,
          atm: 2000,
          tbm: 250,
        },
      },
    },
  });
  const backButton = screen.getByText("Back");
  act(() => {
    fireEvent.click(backButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/");
});
