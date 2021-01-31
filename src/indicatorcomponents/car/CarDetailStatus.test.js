import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import CarDetailStatus from "./CarDetailStatus";
import { Provider } from "react-redux";
import rootReducer from "./../../redux/reducers";
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
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 1600, gcm: 3000 } },
      loads: {
        carLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
      },
      accessories: {
        carAccessories: [
          { accessory: "Towbar", weight: 20 },
          { accessory: "Bullbar", weight: 80 },
        ],
      },
    },
  });

  const payloadRemaining = screen.getByText("You have 140kg payload remaining");
  expect(payloadRemaining).toBeInTheDocument();
});

it("shows the amount of payload over weight", () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 1600, gcm: 3000 } },
      loads: {
        carLoad: [
          { item: "Something", weight: 250, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
      },
      accessories: {
        carAccessories: [
          { accessory: "Towbar", weight: 20 },
          { accessory: "Bullbar", weight: 80 },
        ],
      },
    },
  });

  const payloadRemaining = screen.getByText(
    "You are 10kg over your allowed payload"
  );
  expect(payloadRemaining).toBeInTheDocument();
});

it("shows the total weight makeup (tare, accessories and load", () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 1600, gcm: 3000 } },
      loads: {
        carLoad: [
          { item: "Something", weight: 100, quantity: 1, enabled: true },
          { item: "Something Else", weight: 30, quantity: 2, enabled: true },
        ],
      },
      accessories: {
        carAccessories: [
          { accessory: "Towbar", weight: 20 },
          { accessory: "Bullbar", weight: 80 },
        ],
      },
    },
  });

  screen.getByText("Tare: 1600kg");
  screen.getByText("Load: 160kg");
  screen.getByText("Accessories: 100kg");
  screen.getByText("Total Weight = 1860kg");
  screen.getByText("Allowed GVM: 2000kg");
});

it("renders green when weight is below the threshold", () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 1000, tare: 949, gcm: 3000 } },
    },
  });
  const alertBox = screen.getByTestId("car-detail-status-box");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders orange when weight is above the threshold", () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 1000, tare: 951, gcm: 3000 } },
    },
  });
  const alertBox = screen.getByTestId("car-detail-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders red when weight is above the gvm", () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 } },
    },
  });
  const alertBox = screen.getByTestId("car-detail-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("navigates back to the main page when back is clicked", async () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 } },
    },
  });
  const backButton = screen.getByText("Back");
  act(() => {
    fireEvent.click(backButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/");
});

it("navigates to the combined detail page when the note about inc TBM is clicked", async () => {
  renderComponent(<CarDetailStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 } },
    },
  });
  const linkButton = screen.getByText(/see the combined status/);
  act(() => {
    fireEvent.click(linkButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/combineddetail");
});
