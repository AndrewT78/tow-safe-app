import { render, screen, fireEvent } from "@testing-library/react";
import LoadItem from "./LoadItem";

describe("Load Item", () => {
  const load = {
    item: "Engel",
    quantity: 2,
    weight: 25,
    id: "Engel1",
    enabled: true,
  };
  const disabledLoad = {
    item: "Engel",
    quantity: 2,
    weight: 25,
    id: "Engel1",
    enabled: false,
  };

  const mockDelete = jest.fn();
  const mockToggle = jest.fn();

  it("renders the load item", () => {
    render(<LoadItem item={load} handleDelete={mockDelete} />);
    screen.getByText(/Engel/);
    screen.getByText(/2/);
    screen.getByText(/25/);
  });

  it("indicates the load item's enabled state", () => {
    render(<LoadItem item={load} handleDelete={mockDelete} />);
    const enabledToggle = screen.getByTestId("enabled-toggle-load-Engel1");
  });

  it("indicates the load item's disabled state", () => {
    render(<LoadItem item={disabledLoad} handleDelete={mockDelete} />);
    const enabledToggle = screen.getByTestId("disabled-toggle-load-Engel1");
  });

  it("shows the delete confirmation when the delete button is pressed", () => {
    render(<LoadItem item={load} handleDelete={mockDelete} />);

    const deleteButton = screen.getByTestId("delete-load-Engel1");
    fireEvent.click(deleteButton);

    screen.getByText(/Are you sure you want to delete/);
  });

  it("deletes the item when the confirm delete button is pressed", () => {
    render(<LoadItem item={load} handleDelete={mockDelete} />);

    const deleteButton = screen.getByTestId("delete-load-Engel1");
    fireEvent.click(deleteButton);

    // confirm on the dialog
    const confirmButton = screen.getByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);

    expect(mockDelete).toHaveBeenCalledWith("Engel1");
  });

  it("does not delete the item when the cancel delete button is pressed", () => {
    render(<LoadItem item={load} handleDelete={mockDelete} />);

    const deleteButton = screen.getByTestId("delete-load-Engel1");
    fireEvent.click(deleteButton);

    // confirm on the dialog
    const cancelButton = screen.getByTestId("cancel-delete-button");
    fireEvent.click(cancelButton);

    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("toggles the item when the toggle button is pressed", () => {
    render(
      <LoadItem
        item={load}
        handleDelete={mockDelete}
        handleToggle={mockToggle}
      />
    );

    const toggleButton = screen.getByTestId("enabled-toggle-load-Engel1");
    fireEvent.click(toggleButton);

    expect(mockToggle).toHaveBeenCalledWith("Engel1");
  });
});
