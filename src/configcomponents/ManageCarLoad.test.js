import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
import { createStore } from "redux";
import VanConfig from "./VanConfig";
import ManageCarLoad from './ManageCarLoad';

const myStore = createStore(rootReducer, {});

function renderApp(    
  ui,
  {
    initialState,
    store = myStore,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

it('renders a form for Item, weight and quantity', () => {
  renderApp(<ManageCarLoad />);  
  const itemInput = screen.getByPlaceholderText("Item Name");
  expect(itemInput).toBeInTheDocument();
  
  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();
  
  const quantityInput = screen.getByPlaceholderText("Quantity");
  expect(quantityInput).toBeInTheDocument();
});

it('defaults the quantity to 1', () => {
    renderApp(<ManageCarLoad />);         
    const quantityInput = screen.getByPlaceholderText("Quantity");
    expect(quantityInput.value).toBe("1");
  });

it('disables the add button until all fields are valid', () => {    
    renderApp(<ManageCarLoad/>);  

    const addButton = screen.getByText('Add');
    expect(addButton).toBeDisabled();
 
    const itemInput = screen.getByPlaceholderText("Item Name");
    fireEvent.change(itemInput, { target: { value: 'Engel' } });
    expect(addButton).toBeDisabled();

    const weightInput = screen.getByPlaceholderText("kg");
    fireEvent.change(weightInput, { target: { value: '25' } });  
    expect(addButton).toBeEnabled(); 
});



