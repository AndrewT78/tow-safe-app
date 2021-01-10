import {
  render as rtlRender,
  screen,
  act,
  fireEvent,
} from "@testing-library/react";
import SummaryStatus from "./SummaryStatus";
import { Provider } from "react-redux";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

var testData;

beforeEach(() => {
  testData = {
    configs: {
      vanConfig: { atm: 3000, tare: 2000, tbm: 200 },
      carConfig: { tare: 2000, gcm: 7000, gvm: 3000 },
    },
    loads: { carLoad: [], vanLoad: [] },
  };
});

function renderComponent(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("shows a summary status panel", () => {
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  screen.getByTestId("car-status");
  screen.getByTestId("van-status");
  screen.getByTestId("combined-status-car");
  screen.getByTestId("combined-status-van");
});

it("renders the car green when the weight is below the gvm", () => {
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("car-status");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders the car orange when the weight is above the gvm threshold", () => {
  testData.configs.carConfig.tare = 2851;
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("car-status");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders the car red when the weight is above the gvm", () => {
  testData.configs.carConfig.tare = 3001;
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("car-status");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders the van green when the weight is below the atm", () => {
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("van-status");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders the van orange when the weight is above the gmv threshold", () => {
  testData.configs.vanConfig.tare = 2851;
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("van-status");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders the van red when the weight is above the gvm", () => {
  testData.configs.vanConfig.tare = 3001;
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("van-status");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders the combined green when the weight is below the gcm, and the car combined is below the gvm", () => {
  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("combined-status");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders the combined orange when the combined is above the gcm threshold", () => {
  testData.configs.carConfig.gcm = 10000;
  testData.configs.carConfig.gvm = 10000;
  testData.configs.carConfig.tare = 5000;
  testData.configs.vanConfig.tare = 4501;

  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("combined-status");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders the combined orange when the gcm is ok but the car and tbm exceed gvm threshold", () => {
  testData.configs.vanConfig.tbm = 900;

  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("combined-status");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders the combined red when the gcm is ok but the car and tbm exceed gvm", () => {
  testData.configs.vanConfig.tbm = 1100;

  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("combined-status");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders the combined red when the combined is above the gcm", () => {
  testData.configs.carConfig.gcm = 3999;

  renderComponent(<SummaryStatus />, {
    initialState: testData,
  });
  const alertBox = screen.getByTestId("combined-status");
  expect(alertBox).toHaveClass("alert-danger");
});
