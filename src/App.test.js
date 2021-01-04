import { render as rtlRender, screen } from '@testing-library/react';
import App from './App';
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { createStore } from "redux";

function renderApp(
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



it('renders the form to configure the van config when no config exists', () => {
  renderApp(<App />);  
  const vanATMInput = screen.getByPlaceholderText("ATM");
  expect(vanATMInput).toBeInTheDocument();
});

it('shows the van config when the van has been configured', () => {
  renderApp(<App />, {initialState : {configs : { vanConfig: { atm: 1234 }}}});  
  const vanATMInput = screen.queryByPlaceholderText("ATM");
  expect(vanATMInput).not.toBeInTheDocument();
  const vanATMDisplay = screen.getByText(/1266/);
});
