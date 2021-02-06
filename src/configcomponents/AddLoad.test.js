import { render, screen, fireEvent } from "@testing-library/react";
import AddLoad from "./AddLoad";

const mockHandleLoad = jest.fn();

it("renders a form for Item, weight and quantity", () => {
  render(<AddLoad handleLoad={mockHandleLoad} />);
  const itemInput = screen.getByPlaceholderText("Item Name");
  expect(itemInput).toBeInTheDocument();

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();

  const quantityInput = screen.getByPlaceholderText("x1");
  expect(quantityInput).toBeInTheDocument();
});

it("disables the add button until all fields are valid", () => {
  render(<AddLoad handleLoad={mockHandleLoad} />);

  const addButton = screen.getByText("Add");
  expect(addButton).toBeDisabled();

  const itemInput = screen.getByPlaceholderText("Item Name");
  fireEvent.change(itemInput, { target: { value: "Paper" } });

  expect(addButton).toBeDisabled();
  const kgInput = screen.getByPlaceholderText("kg");
  fireEvent.change(kgInput, { target: { value: "12" } });
  expect(addButton).toBeDisabled();

  const quantityInput = screen.getByPlaceholderText("x1");
  fireEvent.change(quantityInput, { target: { value: "2" } });

  expect(addButton).toBeEnabled();
});

it("adds a load item when the add button is pressed", () => {
  render(<AddLoad handleLoad={mockHandleLoad} />);
  const itemInput = screen.getByPlaceholderText("Item Name");
  fireEvent.change(itemInput, { target: { value: "Engel" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "25" } });

  const quantityInput = screen.getByPlaceholderText("x1");
  fireEvent.change(quantityInput, { target: { value: "2" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(mockHandleLoad).toHaveBeenCalledWith({
    item: "Engel",
    weight: 25,
    quantity: 2,
  });
});
