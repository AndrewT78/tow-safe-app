import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import VanDetailStatus from "./VanDetailStatus";
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

it("shows the amount of payload remaining", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 200 } },
      loads: {
        vanLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
      },
      accessories: {
        vanAccessories: [
          { accessory: "Gas", weight: 10 },
          { accessory: "Annex", weight: 30 },
        ],
      },
    },
  });

  const payloadRemaining = screen.getByText("You have 800kg payload remaining");
  expect(payloadRemaining).toBeInTheDocument();
});

it("shows the amount of payload over weight", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 200 } },
      loads: {
        vanLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
      },
      accessories: {
        vanAccessories: [
          { accessory: "Gas", weight: 10 },
          { accessory: "Annex", weight: 2000 },
        ],
      },
    },
  });

  const payloadRemaining = screen.getByText(
    "You are 1170kg over your allowed payload"
  );
  expect(payloadRemaining).toBeInTheDocument();
});

it("shows the total weight makeup (tare, accessories and load", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 200 } },
      loads: {
        vanLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
      },
      accessories: {
        vanAccessories: [
          { accessory: "Gas", weight: 10 },
          { accessory: "Annex", weight: 30 },
        ],
      },
    },
  });

  screen.getByText("Tare: 2000kg");
  screen.getByText("Load: 160kg");
  screen.getByText("Accessories: 40kg");
  screen.getByText("Total Weight = 2200kg");
  screen.getByText("Allowed ATM: 3000kg");
});

it("renders green when weight is below the threshold and the TBM is within Range", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 1899, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-detail-status-box");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders orange when weight is above the threshold", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 1900, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders red when weight is above the atm", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 2001, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-detail-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders red when weight is above the atm but the tbm is warning", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 2001, tbm: 100 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-detail-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders orange when tbm is below the recommendation", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 159 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders orange when tbm is above the recommendation", () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 261 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("navigates back to the main page when back is clicked", async () => {
  renderComponent(<VanDetailStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2001, tbm: 200 } },
    },
  });
  const backButton = screen.getByText("Back");
  act(() => {
    fireEvent.click(backButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/");
});
