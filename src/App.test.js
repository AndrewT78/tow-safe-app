import {
  render as rtlRender,
  screen,
  fireEvent,
  act,
  cleanup,
} from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./redux/reducers";
import { createStore } from "redux";
import { MemoryRouter } from "react-router-dom";

function renderApp(
  ui,
  {
    initialState,
    store = createStore(rootReducer, initialState),
    initialRoute = "/",
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

xit("renders the app", () => {
  renderApp(<App />);
  const vanATMInput = screen.getByPlaceholderText("Under construction");
  expect(vanATMInput).toBeInTheDocument();
});
