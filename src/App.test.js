import { render as rtlRender, screen, fireEvent, act } from '@testing-library/react';
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

it('renders the form to configure the car config when no car config exists', () => {
  renderApp(<App />, {initialState : {configs : { vanConfig: { atm: 1234 }}}});
  const carGVMInput = screen.getByPlaceholderText("GVM");
  expect(carGVMInput).toBeInTheDocument();
});

it('shows the status panels when the car and van have been configured', () => {
  renderApp(<App />, {initialState : {configs : { vanConfig: { tare: 2150, atm: 3300 }, carConfig: { tare: 1000, gvm: 2200 }}}});    
  const carTareDisplay = screen.getByText(/1000/);
  expect(carTareDisplay).toBeInTheDocument();
  const vanTareDisplay = screen.getByText(/2150/);
  expect(vanTareDisplay).toBeInTheDocument();
  const combinedTotalDisplay = screen.getByText(/3150/);
  expect(combinedTotalDisplay).toBeInTheDocument();
});

it('navigates to the car load page when the car load button is clicked', () => {
  renderApp(<App />, {initialState : {configs : { vanConfig: { tare: 2150, atm: 3300 }, carConfig: { tare: 1000, gvm: 2200 }}}});    
const loadButton = screen.getByTestId('car-manage-load');
  act(() => {
    fireEvent.click(loadButton); 
  });

  const manageLoadScreen = screen.getByPlaceholderText("Item Name");
  expect(manageLoadScreen).toBeInTheDocument();
});
