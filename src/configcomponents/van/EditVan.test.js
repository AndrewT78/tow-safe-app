import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducer from "../../redux/reducers";
import { createStore } from "redux";
import EditVan from "./EditVan";

const myStore = createStore(rootReducer, {
  configs: { vanConfig: { tare: 100, atm: 100, tbm: 100 } },
});

function renderApp(
  ui,
  { initialState, store = myStore, ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

it("renders a form for the van config", () => {
  renderApp(<EditVan />);
  const atmInput = screen.getByPlaceholderText("ATM");
  expect(atmInput).toBeInTheDocument();

  const tareInput = screen.getByPlaceholderText("Tare");
  expect(tareInput).toBeInTheDocument();

  const tbmInput = screen.getByPlaceholderText("TBM");
  expect(tbmInput).toBeInTheDocument();
});

xit("displays the current config in the form", () => {
  renderApp(<EditVan />);
  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  expect(myStore.getState().configs.vanConfig).toEqual({
    atm: 2000,
    tare: 1000,
    tbm: 150,
  });
});

it("can update the van config", () => {
  renderApp(<EditVan />);
  const atmInput = screen.getByPlaceholderText("ATM");
  fireEvent.change(atmInput, { target: { value: "2000" } });

  const tareInput = screen.getByPlaceholderText("Tare");
  fireEvent.change(tareInput, { target: { value: "1000" } });

  const tbmInput = screen.getByPlaceholderText("TBM");
  fireEvent.change(tbmInput, { target: { value: "150" } });

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  expect(myStore.getState().configs.vanConfig).toEqual({
    atm: 2000,
    tare: 1000,
    tbm: 150,
  });
});
