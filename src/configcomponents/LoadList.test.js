import { render, screen, fireEvent } from "@testing-library/react";
import LoadList from "./LoadList";

describe("Load List", () => {
  const load = [
    { item: "Engel", quantity: 2, weight: 25, id: "1", enabled: true },
    { item: "Case", quantity: 4, weight: 15, id: "2", enabled: true },
  ];

  const mockDelete = jest.fn();
  const mockToggle = jest.fn();

  it("renders a list of the load items", () => {
    render(<LoadList load={load} handleDelete={mockDelete} />);
    screen.getByText(/Engel/);
    screen.getByText(/2/);
    screen.getByText(/25/);
    screen.getByText(/Case/);
  });

  it("deletes an item when delete is pressed", () => {
    render(<LoadList load={load} handleDelete={mockDelete} />);
    const deleteButton = screen.getByTestId("delete-load-1");
    fireEvent.click(deleteButton);

    // confirm on the dialog
    const confirmButton = screen.getByTestId("confirm-delete-button");
    fireEvent.click(confirmButton);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith("1");
  });

  it("toggles an item when toggle is pressed", () => {
    render(
      <LoadList
        load={load}
        handleDelete={mockDelete}
        handleToggle={mockToggle}
      />
    );
    const toggleButton = screen.getByTestId("enabled-toggle-load-1");
    fireEvent.click(toggleButton);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith("1");
  });
});
