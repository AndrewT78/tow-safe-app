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

it('renders a tile showing the car config', () => {
  renderComponent(<CarStatus />, {initialState : {configs : { carConfig: { gvm: 2000, tare: 1000, gcm: 3000 }}}});  
  
  const gvm = screen.getByText(/2000/);
  expect(gvm).toBeInTheDocument();

  const tare = screen.getByText(/1000/);
  expect(tare).toBeInTheDocument();
});

