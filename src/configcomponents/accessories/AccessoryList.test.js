import { render, screen, fireEvent } from "@testing-library/react";
import AccessoryList from "./AccessoryList";

describe("Accessory List", () => {
  const accessories = [
    { accessory: "Gas", weight: 18, id: "1" },
    { accessory: "Awning", weight: 80, id: "2" },
  ];

  const mockDelete = jest.fn();

  it("renders a list of the accessory items", () => {
    render(
      <AccessoryList accessories={accessories} handleDelete={mockDelete} />
    );
    screen.getByText(/Gas/);
    screen.getByText(/Awning/);
  });

  it("deletes an item when delete is pressed", () => {
    render(
      <AccessoryList accessories={accessories} handleDelete={mockDelete} />
    );
    const deleteButton = screen.getByTestId("delete-acc-1");
    fireEvent.click(deleteButton);

    // confirm on the dialog
    const confirmButton = screen.getByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("1");
  });
});
