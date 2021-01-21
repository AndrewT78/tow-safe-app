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
    var field = screen.getByPlaceholderText("kg");
    expect(field).toHaveValue(80);
  });

  it("moves to the next item when you select 'skip'", () => {
    render(<AccessoriesAdder accessories={accessoryList}></AccessoriesAdder>);
    var nextButton = screen.getByText(/Skip/);
    fireEvent.click(nextButton);

    screen.getByText(/Roof Rack/);
    var field = screen.getByPlaceholderText("kg");
    expect(field).toHaveValue(20);
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

  it("adds the item with a custom weight to the accessories", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var field = screen.getByPlaceholderText("kg");
    fireEvent.change(field, { target: { value: "100" } });

    var addButton = screen.getByText(/Add/);
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith({ accessory: "Bullbar", weight: 100 });
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
    var field = screen.getByPlaceholderText("kg");
    expect(field).toHaveValue(20);
  });

  it("shows a completion message when you add the last accessory", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var nextButton = screen.getByText(/Skip/);
    fireEvent.click(nextButton);

    nextButton = screen.getByText(/Skip/);
    fireEvent.click(nextButton);

    var addButton = screen.getByText(/Add/);
    fireEvent.click(addButton);

    screen.getByText(
      "You have completed adding accessories, select 'Done' to continue"
    );
  });

  it("disables the Add button if the weight is empty", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var field = screen.getByPlaceholderText("kg");
    fireEvent.change(field, { target: { value: "" } });

    var addButton = screen.getByText(/Add/);
    expect(addButton).toBeDisabled();
  });
});
