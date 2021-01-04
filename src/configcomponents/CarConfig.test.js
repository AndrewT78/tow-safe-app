import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "../redux/reducers";
import { createStore } from "redux";
import CarConfig from "./CarConfig";

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

it('renders a form for GVM, Tare and GCM', () => {
  renderApp(<CarConfig />);  
  const gvmInput = screen.getByPlaceholderText("GVM");
  expect(gvmInput).toBeInTheDocument();
  
  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();
  
  const gcmInput = screen.getByPlaceholderText("GCM");
  expect(gcmInput).toBeInTheDocument();
});

it('disables the next button until all fields are valid', () => {    
    renderApp(<CarConfig/>);  

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

    const gvmInput = screen.getByPlaceholderText("GVM");
    fireEvent.change(gvmInput, { target: { value: '2000' } });
    expect(nextButton).toBeDisabled();

    const tareInput = screen.getByPlaceholderText("Tare");
    fireEvent.change(tareInput, { target: { value: '1000' } });
    expect(nextButton).toBeDisabled();

    const gcmInput = screen.getByPlaceholderText("GCM");
    fireEvent.change(gcmInput, { target: { value: '150' } });   
    expect(nextButton).toBeEnabled(); 
});


it('updates the van config when the button is pressed', () => {    
    renderApp(<CarConfig/>);  
    const gvmInput = screen.getByPlaceholderText("GVM");
    fireEvent.change(gvmInput, { target: { value: '2000' } });

    const tareInput = screen.getByPlaceholderText("Tare");
    fireEvent.change(tareInput, { target: { value: '1000' } });

    const gcmInput = screen.getByPlaceholderText("GCM");
    fireEvent.change(gcmInput, { target: { value: '3000' } });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);    

    expect(myStore.getState().configs.carConfig).toEqual({ gvm: 2000, tare: 1000, gcm: 3000});
});