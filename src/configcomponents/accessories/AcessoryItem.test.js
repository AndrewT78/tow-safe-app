import { render, screen, fireEvent } from "@testing-library/react";
import AccessoryItem from "./AccessoryItem";

describe("Accessory Item", () => {
  const accessory = {
    accessory: "Roofrack",
    weight: 18,
    id: "Roofrack1",
  };

  const mockDelete = jest.fn();

  it("renders the accessory item", () => {
    render(<AccessoryItem accessory={accessory} handleDelete={mockDelete} />);
    screen.getByText(/Roofrack/);
    screen.getByText(/18/);
  });

  it("shows the delete confirmation when the delete button is pressed", () => {
    render(<AccessoryItem accessory={accessory} handleDelete={mockDelete} />);

    const deleteButton = screen.getByTestId("delete-acc-Roofrack1");
    fireEvent.click(deleteButton);

    screen.getByText(/Are you sure you want to delete/);
  });

  it("deletes the accessory when the confirm delete button is pressed", () => {
    render(<AccessoryItem accessory={accessory} handleDelete={mockDelete} />);

    const deleteButton = screen.getByTestId("delete-acc-Roofrack1");
    fireEvent.click(deleteButton);

    // confirm on the dialog
    const confirmButton = screen.getByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);

    expect(mockDelete).toHaveBeenCalledWith("Roofrack1");
  });

  it("does not delete the item when the cancel delete button is pressed", () => {
    render(<AccessoryItem accessory={accessory} handleDelete={mockDelete} />);

    const deleteButton = screen.getByTestId("delete-acc-Roofrack1");
    fireEvent.click(deleteButton);

    // confirm on the dialog
    const cancelButton = screen.getByTestId("cancel-delete-button");
    fireEvent.click(cancelButton);

    expect(mockDelete).not.toHaveBeenCalled();
  });
});
