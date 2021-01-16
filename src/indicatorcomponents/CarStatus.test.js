import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import CarStatus from "./CarStatus";
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
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

it("shows total weight and gvm", () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 1000, gcm: 3000 } },
    },
  });
  const totalWeight = screen.getByText("1000 (2000) - Total Weight (GVM)");
  expect(totalWeight).toBeInTheDocument();
});

it("shows the amount of payloadload remaining", () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 1600, gcm: 3000 } },
    },
  });
  const payloadRemaining = screen.getByText("400 - Remaining Payload");
  expect(payloadRemaining).toBeInTheDocument();
});

it("renders green when weight is below the threshold", () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 1000, tare: 949, gcm: 3000 } },
    },
  });
  const alertBox = screen.getByTestId("car-status-box");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders orange when weight is above the threshold", () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 1000, tare: 951, gcm: 3000 } },
    },
  });
  const alertBox = screen.getByTestId("car-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders red when weight is above the gvm", () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 } },
    },
  });
  const alertBox = screen.getByTestId("car-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("navigates to the car load page when the load icon is clicked", async () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 } },
    },
  });
  const loadButton = screen.getByTestId("car-manage-load");
  act(() => {
    fireEvent.click(loadButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/carload");
});

it("navigates to the car config page when the car icon is clicked", async () => {
  renderComponent(<CarStatus />, {
    initialState: {
      configs: { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 } },
    },
  });
  const configButton = screen.getByTestId("car-config");
  act(() => {
    fireEvent.click(configButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/carconfig");
});
