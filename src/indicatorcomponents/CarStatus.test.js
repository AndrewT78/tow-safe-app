import { render as rtlRender, screen } from '@testing-library/react';
import CarStatus from './CarStatus';
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
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

it('shows total weight and gvm', () => {
    renderComponent(<CarStatus />, {initialState : {configs : { carConfig: { gvm: 2000, tare: 1000, gcm: 3000 }}}}); 
    const totalWeight = screen.getByText("1000 (2000)");
    expect(totalWeight).toBeInTheDocument();
});

it('shows the amount of payloadload remaining', () => {
    renderComponent(<CarStatus />, {initialState : {configs : { carConfig: { gvm: 2000, tare: 1600, gcm: 3000 }}}}); 
    const payloadRemaining = screen.getByText("Remaining Payload: 400");
    expect(payloadRemaining).toBeInTheDocument();
});

it("renders green when weight is below the threshold", () => {
    renderComponent(<CarStatus />, {initialState : {configs : { carConfig: { gvm: 2000, tare: 1780, gcm: 3000 }}}});
    const alertBox = screen.getByTestId("car-status-box");
    expect(alertBox).toHaveClass("alert-success");
});

it("renders orange when weight is above the threshold", () => {
    renderComponent(<CarStatus />, {initialState : {configs : { carConfig: { gvm: 2000, tare: 1800, gcm: 3000 }}}});
    const alertBox = screen.getByTestId("car-status-box");
    expect(alertBox).toHaveClass("alert-warning");
});

it("renders red when weight is above the gvm", () => {
    renderComponent(<CarStatus />, {initialState : {configs : { carConfig: { gvm: 2000, tare: 2001, gcm: 3000 }}}});
    const alertBox = screen.getByTestId("car-status-box");
    expect(alertBox).toHaveClass("alert-danger");
});


