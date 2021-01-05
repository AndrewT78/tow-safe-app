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