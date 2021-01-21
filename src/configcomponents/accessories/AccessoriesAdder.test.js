import { render, screen, fireEvent } from "@testing-library/react";
import AccessoriesAdder from "./AccessoriesAdder";

describe("Accessories Adder", () => {
  const accessoryList = [
    { name: "Bullbar", weight: 80 },
    { name: "Roof Rack", weight: 20 },
    { name: "Towbar", weight: 30 },
  ];

  const mockAdd = jest.fn();

  it("Shows the first accessory in the specified list", () => {
    render(<AccessoriesAdder accessories={accessoryList}></AccessoriesAdder>);
    screen.getByText(/Bullbar/);
  });

  it("moves to the next item when you select 'next'", () => {
    render(<AccessoriesAdder accessories={accessoryList}></AccessoriesAdder>);
    var nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);

    screen.getByText(/Roof Rack/);
  });

  it("adds the item to the accessories when you select 'Add'", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var addButton = screen.getByText(/Add/);
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith({ accessory: "Bullbar", weight: 80 });
  });

  it("moves to the next item when you select add", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var addButton = screen.getByText(/Add/);
    fireEvent.click(addButton);
    screen.getByText(/Roof Rack/);
  });

  it("does not show the next button when showing the final item", () => {
    render(<AccessoriesAdder accessories={accessoryList}></AccessoriesAdder>);
    var nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);

    nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);

    screen.getByText(/Towbar/);
    expect(screen.queryByText(/Next/i)).toBeNull();
  });

  it("shows a completion message when you add the last accessory", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);

    nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);

    var addButton = screen.getByText(/Add/);
    fireEvent.click(addButton);

    screen.getByText(
      "You have completed adding accessories, select 'Skip' to continue"
    );
  });
});
