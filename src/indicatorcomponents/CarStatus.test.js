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



