import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
import { createStore } from "redux";
import ManageCarLoad from './ManageCarLoad';
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
  renderApp(<ManageCarLoad />);  
  screen.getByPlaceholderText("Item Name");
  screen.getByPlaceholderText("kg");
  screen.getByPlaceholderText("Quantity");  
});

it('renders a list of the load items', () => {
    renderApp(<ManageCarLoad />, {initialState : {loads : { carLoad: [{ item: "Engel", quantity: 1, weight: 20},
    { item: "Cases", quantity: 4, weight: 18} ]}}});  
    screen.getByText(/Engel/);
    screen.getAllByText(/1/);
    screen.getByText(/20/);
    screen.getByText(/Cases/);
});

it('adds a load item when the add button is pressed', () => {    
    renderAppWithMyStore(<ManageCarLoad/>);  
    const itemInput = screen.getByPlaceholderText("Item Name");
    fireEvent.change(itemInput, { target: { value: 'Engel' } });

    const weightInput = screen.getByPlaceholderText("kg");
    fireEvent.change(weightInput, { target: { value: '25' } }); 

    const quantityInput = screen.getByPlaceholderText("Quantity");
    fireEvent.change(quantityInput, { target: { value: '2' } }); 

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);    

    expect(myStore.getState().loads.carLoad).toEqual(expect.arrayContaining([expect.objectContaining({ item: 'Engel', quantity: 2, weight: 25})]));
});

it('navigates back to the main page when back is clicked', () => {
  renderApp(<ManageCarLoad />);    
  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);  
  expect(historySpy).toHaveBeenCalledWith("/");
});



