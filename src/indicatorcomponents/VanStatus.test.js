import { render as rtlRender, screen } from '@testing-library/react';
import VanStatus from './VanStatus';
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

it('shows total weight and atm', () => {
    renderComponent(<VanStatus />, {initialState : {configs : { vanConfig: { atm: 3300, tare: 2150, tbm: 180 }}}}); 
    const totalWeight = screen.getByText("2150 (3300) - Total Weight (ATM)");
    expect(totalWeight).toBeInTheDocument();
});

it('shows the amount of payloadload remaining', () => {
    renderComponent(<VanStatus />, {initialState : {configs : { vanConfig: { atm: 2000, tare: 1600, tbm: 180 }}}}); 
    const payloadRemaining = screen.getByText("400 - Remaining Payload");
    expect(payloadRemaining).toBeInTheDocument();
});

it("renders green when weight is below the threshold", () => {
    renderComponent(<VanStatus />, {initialState : {configs : { vanConfig: { atm: 2000, tare: 1780, tbm: 180 }}}});
    const alertBox = screen.getByTestId("van-status-box");
    expect(alertBox).toHaveClass("alert-success");
});

it("renders orange when weight is above the threshold", () => {
    renderComponent(<VanStatus />, {initialState : {configs : { vanConfig: { atm: 2000, tare: 1800, tbm: 180 }}}});
    const alertBox = screen.getByTestId("van-status-box");
    expect(alertBox).toHaveClass("alert-warning");
});

it("renders red when weight is above the atm", () => {
    renderComponent(<VanStatus />, {initialState : {configs : { vanConfig: { atm: 2000, tare: 2001, tbm: 180 }}}});
    const alertBox = screen.getByTestId("van-status-box");
    expect(alertBox).toHaveClass("alert-danger");
});


