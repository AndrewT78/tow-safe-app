import { render, screen, fireEvent } from "@testing-library/react";
import LoadToggle from "./LoadToggle";

const mockHandleAddLoad = jest.fn();
const mockHandleDeleteLoad = jest.fn();

const mockLoad = {
  item: "Case",
  weight: 20,
  id: "Case1",
  quantity: 4,
};

it("renders a form for load, quantity and weight", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
    />
  );
  const itemInput = screen.getByPlaceholderText("Item Name");
  expect(itemInput).toBeInTheDocument();

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();

  const quantityInput = screen.getByPlaceholderText("Qty");
  expect(quantityInput).toBeInTheDocument();

  const toggleOn = screen.getByTestId("btn-load-off");
  expect(toggleOn).toBeInTheDocument();
});

it("renders a prefilled form for the load, quantity and weight", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
    />
  );
  const itemInput = screen.getByPlaceholderText("Item Name");
  expect(itemInput.value).toBe("Case");

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput.value).toBe("20");

  const quantityInput = screen.getByPlaceholderText("Qty");
  expect(quantityInput.value).toBe("4");
});

it("renders a disabled form for accessory and weight when toggled on", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
      toggle={true}
    />
  );
  const itemInput = screen.getByPlaceholderText("Item Name");
  expect(itemInput).toBeInTheDocument();
  expect(itemInput).toBeDisabled();

  const weightInput = screen.getByPlaceholderText("kg");
  expect(weightInput).toBeInTheDocument();
  expect(weightInput).toBeDisabled();

  expect(screen.queryByTestId("btn-load-off")).toBeNull();
  expect(screen.getByTestId("btn-load-on")).toBeInTheDocument();
});

it("disables the toggle on button until all fields are valid", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
    />
  );

  const toggleOn = screen.getByTestId("btn-load-off");
  expect(toggleOn).toBeEnabled();

  const accInput = screen.getByPlaceholderText("Item Name");
  fireEvent.change(accInput, { target: { value: "" } });
  expect(toggleOn).toBeDisabled();
  fireEvent.change(accInput, { target: { value: "An Accessory" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "2" } });

  expect(toggleOn).toBeEnabled();
});

it("adds an accessory when the toggled on", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
    />
  );

  const itemInput = screen.getByPlaceholderText("Item Name");
  fireEvent.change(itemInput, { target: { value: "Bags" } });

  const weightInput = screen.getByPlaceholderText("kg");
  fireEvent.change(weightInput, { target: { value: "18" } });

  const onToggle = screen.getByTestId("btn-load-off");
  fireEvent.click(onToggle);

  expect(mockHandleAddLoad).toHaveBeenCalledWith({
    item: "Bags",
    weight: 18,
    quantity: 4,
    id: "Case1",
  });
});

it("swaps the button to be remove when toggled on", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
      toggle={true}
    />
  );

  expect(screen.queryByTestId("btn-load-off")).toBeNull();
  expect(screen.getByTestId("btn-load-on")).toBeInTheDocument();
});

it("swaps the button to be add when toggled off", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
    />
  );

  expect(screen.queryByTestId("btn-load-pn")).toBeNull();
  expect(screen.getByTestId("btn-load-off")).toBeInTheDocument();
});

it("removes a load when the toggled off", () => {
  render(
    <LoadToggle
      handleAddLoad={mockHandleAddLoad}
      handleDeleteLoad={mockHandleDeleteLoad}
      load={mockLoad}
      toggle={true}
    />
  );

  const onToggle = screen.getByTestId("btn-load-on");
  fireEvent.click(onToggle);

  expect(mockHandleDeleteLoad).toHaveBeenCalledWith("Case1");
});
