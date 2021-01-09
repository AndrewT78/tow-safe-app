import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
import { createStore } from "redux";
import ManageCarLoad from './ManageCarLoad';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from "history";

var myStore;
const initialState = { loads : { carLoad: [{ item: "Engel", quantity: 1, weight: 20, id: "Engel1"},
{ item: "Cases", quantity: 4, weight: 18, id: "Cases1"} ]}};
const history = createMemoryHistory();
const historySpy = jest.spyOn(history, "push");

beforeEach(() => {
  myStore = createStore(rootReducer, initialState);
});


function renderApp(    
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
    renderApp(<ManageCarLoad/>);
    screen.getByText(/Engel/);
    screen.getAllByText(/1/);
    screen.getByText(/20/);
    screen.getByText(/Cases/);
});

it('adds a load item when the add button is pressed', () => {    
    renderApp(<ManageCarLoad/>);  
    const itemInput = screen.getByPlaceholderText("Item Name");
    fireEvent.change(itemInput, { target: { value: 'New Item' } });

    const weightInput = screen.getByPlaceholderText("kg");
    fireEvent.change(weightInput, { target: { value: '100' } }); 

    const quantityInput = screen.getByPlaceholderText("Quantity");
    fireEvent.change(quantityInput, { target: { value: '2' } }); 

    const addButton = screen.getByText('Add');
    fireEvent.click(addButton);    

    expect(myStore.getState().loads.carLoad).toEqual(expect.arrayContaining([expect.objectContaining({ item: 'New Item', quantity: 2, weight: 100})]));
});

it('deletes a load item when the delete button is pressed', () => {    
  renderApp(<ManageCarLoad/>);  
  screen.getByText(/Engel/);
  const deleteButton = screen.getByTestId('delete-load-Engel1');
  fireEvent.click(deleteButton);    

  expect(myStore.getState().loads.carLoad).toEqual([{ item: "Cases", quantity: 4, weight: 18, id: "Cases1"}]);
  expect(screen.queryByText(/Engel/i)).toBeNull();
});

it('navigates back to the main page when back is clicked', () => {
  renderApp(<ManageCarLoad />);    
  const backButton = screen.getByText('Back');
  fireEvent.click(backButton);  
  expect(historySpy).toHaveBeenCalledWith("/");
});



