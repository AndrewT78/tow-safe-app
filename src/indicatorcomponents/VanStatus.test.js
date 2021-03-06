import {
  render as rtlRender,
  screen,
  act,
  fireEvent,
} from "@testing-library/react";
import VanStatus from "./VanStatus";
import { Provider } from "react-redux";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

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

it("shows total weight and atm", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3300, tare: 2150, tbm: 180 }, vanLoad: [] },
    },
  });
  const totalWeight = screen.getByText("2150 (3300)");
  expect(totalWeight).toBeInTheDocument();
});

it("navigates to the van detail info button is clicked", async () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3300, tare: 2150, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertArea = screen.getByTestId("van-detail-status-link");
  act(() => {
    fireEvent.click(alertArea);
  });
  expect(historySpy).toHaveBeenCalledWith("/vandetail");
});

it("renders green when weight is below the threshold and the TBM is within Range", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 1899, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-status-box");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders orange when weight is above the threshold", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 1900, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders red when weight is above the atm", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 2001, tbm: 180 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders red when weight is above the atm but the tbm is warning", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 2000, tare: 2001, tbm: 100 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders orange when tbm is below the recommendation", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 159 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders orange when tbm is above the recommendation", () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2000, tbm: 261 }, vanLoad: [] },
    },
  });
  const alertBox = screen.getByTestId("van-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("navigates to the van load page when the load icon is clicked", async () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2001, tbm: 180 } },
    },
  });
  const loadButton = screen.getByTestId("van-manage-load");
  act(() => {
    fireEvent.click(loadButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/vanload");
});

it("navigates to the van config page when the van icon is clicked", async () => {
  renderComponent(<VanStatus />, {
    initialState: {
      configs: { vanConfig: { atm: 3000, tare: 2001, tbm: 180 } },
    },
  });
  const configButton = screen.getByTestId("van-config");
  act(() => {
    fireEvent.click(configButton);
  });
  expect(historySpy).toHaveBeenCalledWith("/vanconfig");
});
