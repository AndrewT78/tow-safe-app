import { render as rtlRender, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import rootReducer from "./../redux/reducers";
import { createStore } from "redux";
import VanConfig from "./VanConfig";


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

it('renders a form for ATM, Tare and TBM', () => {
  renderApp(<VanConfig />);  
  const atmInput = screen.getByPlaceholderText("ATM");
  expect(atmInput).toBeInTheDocument();
  
  const tareInput = screen.getByPlaceholderText("Tare");
  expect(atmInput).toBeInTheDocument();
  
  const tbmInput = screen.getByPlaceholderText("TBM");
  expect(tbmInput).toBeInTheDocument();
});

it('disables the next button until all fields are valid', () => {    
    renderApp(<VanConfig/>);  

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();

    const atmInput = screen.getByPlaceholderText("ATM");
    fireEvent.change(atmInput, { target: { value: '2000' } });
    expect(nextButton).toBeDisabled();

    const tareInput = screen.getByPlaceholderText("Tare");
    fireEvent.change(tareInput, { target: { value: '1000' } });
    expect(nextButton).toBeDisabled();

    const tbmInput = screen.getByPlaceholderText("TBM");
    fireEvent.change(tbmInput, { target: { value: '150' } });   
    expect(nextButton).toBeEnabled(); 
});


xit('updates the van config when the button is pressed', () => {    
    renderApp(<VanConfig/>);  
    const atmInput = screen.getByPlaceholderText("ATM");
    fireEvent.change(atmInput, { target: { value: '2000' } });

    const tareInput = screen.getByPlaceholderText("Tare");
    fireEvent.change(tareInput, { target: { value: '1000' } });

    const tbmInput = screen.getByPlaceholderText("TBM");
    fireEvent.change(tbmInput, { target: { value: '150' } });

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);    
});