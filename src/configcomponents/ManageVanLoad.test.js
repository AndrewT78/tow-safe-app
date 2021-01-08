import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
import { createStore } from "redux";
import ManageVanLoad from './ManageVanLoad';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

const myStore = createStore(rootReducer, {});
const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

function renderApp(    
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><Router history={history}>{children}</Router></Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderAppWithMyStore(    
    ui,
    {
      initialState,
      store = myStore,
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return <Provider store={store}><Router history={history}>{children}</Router></Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  }

it('renders a form for Item, weight and quantity', () => {
  renderApp(<ManageVanLoad />);  
  screen.getByPlaceholderText("Item Name");
  screen.getByPlaceholderText("kg");
  screen.getByPlaceholderText("Quantity");  
});

it('renders a list of the load items', () => {
    renderApp(<ManageVanLoad />, {initialState : {loads : { vanLoad: [{ item: "Sheets", quantity: 8, weight: 3},
    { item: "Cases", quantity: 4, weight: 18} ]}}});  
    screen.getByText(/Sheets/);
    screen.getAllByText(/8/);
    screen.getByText(/3/);
    screen.getByText(/Cases/);
});

it('adds a load item when the add button is pressed', () => {    
    renderAppWithMyStore(<ManageVanLoad/>);  
    const itemInput = screen.getByPlaceholderText("Item Name");
    fireEvent.change(itemInput, { target: { value: 'Sheets' } });

    const weightInput = screen.getByPlaceholderText("kg");
    fireEvent.change(weightInput, { target: { value: '2' } }); 

    const quantityInput = screen.getByPlaceholderText("Quantity");
    fireEvent.change(quantityInput, { target: { value: '8' } }); 

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);    

    expect(myStore.getState().loads.vanLoad).toEqual([{ item: 'Sheets', quantity: 8, weight: 2}]);
});

it('navigates back to the main page when back is clicked', () => {
  renderApp(<ManageVanLoad />);    
  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);  
  expect(historySpy).toHaveBeenCalledWith("/");
});



