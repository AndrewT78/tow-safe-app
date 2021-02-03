import { render, screen, fireEvent } from "@testing-library/react";
import AccessoryToggle from "./AccessoryToggle";

const mockHandleAddAccessory = jest.fn();
const mockHandleDeleteAccessory = jest.fn();

const mockAccessory = {
  accessory: "Solar",
  weight: 20,
  id: "Solar1",
};

it("renders a form for accessory and weight", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
    />
  );
  const accInput = screen.getByPlaceholderText("Accessory");
  expect(accInput).toBeInTheDocument();

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();

  const toggleOn = screen.getByTestId("btn-acc-off");
  expect(toggleOn).toBeInTheDocument();
});

it("renders a prefilled form for the accessory and weight", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
    />
  );
  const accInput = screen.getByPlaceholderText("Accessory");
  expect(accInput.value).toBe("Solar");

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput.value).toBe("20");
});

it("renders a disabled form for accessory and weight when toggled on", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      toggle={true}
      accessory={mockAccessory}
    />
  );
  const accInput = screen.getByPlaceholderText("Accessory");
  expect(accInput).toBeInTheDocument();
  expect(accInput).toBeDisabled();

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();
  expect(weightInput).toBeDisabled();

  expect(screen.queryByText("+")).toBeNull();
  expect(screen.getByTestId("btn-acc-on")).toBeInTheDocument();
});

it("disables the toggle on button until all fields are valid", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
    />
  );

  const toggleOn = screen.getByTestId("btn-acc-off");
  expect(toggleOn).toBeEnabled();

  const accInput = screen.getByPlaceholderText("Accessory");
  fireEvent.change(accInput, { target: { value: "" } });
  expect(toggleOn).toBeDisabled();
  fireEvent.change(accInput, { target: { value: "An Accessory" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "2" } });

  expect(toggleOn).toBeEnabled();
});

it("adds an accessory when the toggled on", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
    />
  );

  const accInput = screen.getByPlaceholderText("Accessory");
  fireEvent.change(accInput, { target: { value: "Solar Panels" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "18" } });

  const onToggle = screen.getByTestId("btn-acc-off");
  fireEvent.click(onToggle);

  expect(mockHandleAddAccessory).toHaveBeenCalledWith({
    accessory: "Solar Panels",
    weight: 18,
    id: "Solar1",
  });
});

it("swaps the button to be remove when toggled on", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
      toggle={true}
    />
  );

  expect(screen.queryByText("+")).toBeNull();
  expect(screen.getByTestId("btn-acc-on")).toBeInTheDocument();
});

it("swaps the button to be add when toggled off", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
      toggle={false}
    />
  );

  expect(screen.queryByText("-")).toBeNull();
  expect(screen.getByTestId("btn-acc-off")).toBeInTheDocument();
});

it("does on and then off", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
    />
  );

  expect(screen.queryByText("-")).toBeNull();
  expect(screen.getByTestId("btn-acc-off")).toBeInTheDocument();

  const onToggle = screen.getByTestId("btn-acc-off");
  fireEvent.click(onToggle);

  expect(screen.queryByText("+")).toBeNull();
  expect(screen.getByTestId("btn-acc-on")).toBeInTheDocument();

  const offToggle = screen.getByTestId("btn-acc-on");
  fireEvent.click(offToggle);

  expect(screen.queryByText("-")).toBeNull();
  expect(screen.getByTestId("btn-acc-off")).toBeInTheDocument();
});

it("removes an accessory when the toggled off", () => {
  render(
    <AccessoryToggle
      handleAddAccessory={mockHandleAddAccessory}
      handleDeleteAccessory={mockHandleDeleteAccessory}
      accessory={mockAccessory}
      toggle={true}
    />
  );

  const onToggle = screen.getByTestId("btn-acc-on");
  fireEvent.click(onToggle);

  expect(mockHandleDeleteAccessory).toHaveBeenCalledWith("Solar1");
});
