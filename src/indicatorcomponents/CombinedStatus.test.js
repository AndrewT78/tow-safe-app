import { render as rtlRender, screen } from '@testing-library/react';
import CombinedStatus from './CombinedStatus';
import { Provider } from "react-redux";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";

function renderComponent(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}


const storeState = {
  configs : { 
    vanConfig: { atm: 3000, tare: 2000, tbm: 180 },
    carConfig: { gvm: 3500, tare: 3000, gcm: 7000 } 
  }
};

it('shows total weight and gcm', () => {
    renderComponent(<CombinedStatus />, {initialState : storeState}); 
    const totalWeight = screen.getByText("5000 (7000)");
    expect(totalWeight).toBeInTheDocument();
});

it('shows the total car weight with the towball applied, and the gvm', () => {
  renderComponent(<CombinedStatus />, {initialState : storeState}); 
    const totalCarWeight = screen.getByText("3180 (3500)");
    expect(totalCarWeight).toBeInTheDocument();
});

it("renders green when combined weight and car combined weight are below the gcm threshold", () => {
  renderComponent(<CombinedStatus />, {initialState : {configs : { carConfig: { gvm: 3000, tare: 2000, gcm: 7000 }, vanConfig: { atm: 3000, tare: 2000, tbm: 100}}}});
  const alertBox = screen.getByTestId("combined-status-box");
  expect(alertBox).toHaveClass("alert-success");
});

it("renders warning when combined weight is above the gcm threshold", () => {
  renderComponent(<CombinedStatus />, {initialState : {configs: {
    carConfig: {
      tare: 7001,
      gvm: 8000,
      gcm: 10000
  },
  vanConfig: {
    tare: 2000,
    atm: 7000,
    tbm: 300
  }}}});
  const alertBox = screen.getByTestId("combined-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders warning when car combined weight is above the gvm threshold", () => {
  renderComponent(<CombinedStatus />, {initialState : {
    configs: {
      carConfig: {
          tare: 1700,
          gvm: 2000,
          gcm: 10000
      },
      vanConfig: {
        tare: 2000,
        atm: 5000,
        tbm: 101
      }
  }    }
  
  });

  const alertBox = screen.getByTestId("combined-status-box");
  expect(alertBox).toHaveClass("alert-warning");
});

it("renders over when combined weight is above the gcm", () => {
  renderComponent(<CombinedStatus />, {initialState : {configs: {
    carConfig: {
      tare: 7001,
      gvm: 8000,
      gcm: 10000
  },
  vanConfig: {
    tare: 3000,
    atm: 7000,
    tbm: 300
  }}}});
  const alertBox = screen.getByTestId("combined-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});

it("renders over when car combined weight is above the gvm", () => {
  renderComponent(<CombinedStatus />, {initialState : {
    configs: {
      carConfig: {
          tare: 1700,
          gvm: 2000,
          gcm: 10000
      },
      vanConfig: {
        tare: 2000,
        atm: 5000,
        tbm: 301
      }
  }    }
  
  });
  
  const alertBox = screen.getByTestId("combined-status-box");
  expect(alertBox).toHaveClass("alert-danger");
});
