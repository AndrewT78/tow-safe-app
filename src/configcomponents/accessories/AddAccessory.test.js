import { render, screen, fireEvent } from "@testing-library/react";
import AddAccessory from "./AddAccessory";

const mockHandleAccessory = jest.fn();

it("renders a form for accessory and weight", () => {
  render(<AddAccessory handleAccessory={mockHandleAccessory} />);
  const accInput = screen.getByPlaceholderText("Accessory");
  expect(accInput).toBeInTheDocument();

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();
});

it("disables the add button until all fields are valid", () => {
  render(<AddAccessory handleAccessory={mockHandleAccessory} />);

  const addButton = screen.getByText("Add");
  expect(addButton).toBeDisabled();

  const accInput = screen.getByPlaceholderText("Accessory");
  fireEvent.change(accInput, { target: { value: "Bullbar" } });

  expect(addButton).toBeEnabled();
});

it("adds an accessory when the add button is pressed", () => {
  render(<AddAccessory handleAccessory={mockHandleAccessory} />);
  const accInput = screen.getByPlaceholderText("Accessory");
  fireEvent.change(accInput, { target: { value: "Gas" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "18" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  expect(mockHandleAccessory).toHaveBeenCalledWith({
    accessory: "Gas",
    weight: 18,
  });
});
