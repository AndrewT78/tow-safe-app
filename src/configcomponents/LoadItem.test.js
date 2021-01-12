import { render, screen, fireEvent } from "@testing-library/react";
import LoadItem from "./LoadItem";

import { FaCaravan } from "react-icons/fa";

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
  const mockMove = jest.fn();

  it("renders the load item", () => {
    render(<LoadItem item={load} handleDelete={mockDelete} />);
    screen.getByText(/Engel/);
    screen.getByText(/2/);
    screen.getByText(/25/);
  });

  it("renders the load item with the move content", () => {
    render(
      <LoadItem
        item={load}
        handleDelete={mockDelete}
        moveIcon={<FaCaravan data-testid="van" size="25"></FaCaravan>}
      />
    );
    screen.getByTestId("van");
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

  it("shows the move confirmation when the move button is pressed", () => {
    render(<LoadItem item={load} handleMove={mockMove} />);

    const moveButton = screen.getByTestId("move-load-Engel1");
    fireEvent.click(moveButton);

    screen.getByText(/Are you sure you want to move/);
  });

  it("moves the item to the other vehicle when the move button is pressed", () => {
    render(
      <LoadItem
        item={load}
        handleDelete={mockDelete}
        handleToggle={mockToggle}
        handleMove={mockMove}
      />
    );

    const moveButton = screen.getByTestId("move-load-Engel1");
    fireEvent.click(moveButton);

    // confirm on the dialog
    const confirmButton = screen.getByTestId("confirm-move-button");
    fireEvent.click(confirmButton);

    expect(mockMove).toHaveBeenCalledWith("Engel1");
  });

  it("does not move the item to the other vehicle when the cancel button is pressed", () => {
    render(
      <LoadItem
        item={load}
        handleDelete={mockDelete}
        handleToggle={mockToggle}
        handleMove={mockMove}
      />
    );

    const moveButton = screen.getByTestId("move-load-Engel1");
    fireEvent.click(moveButton);

    // cancel on the dialog
    const cancelButton = screen.getByTestId("cancel-move-button");
    fireEvent.click(cancelButton);

    expect(mockMove).not.toHaveBeenCalled();
  });
});
