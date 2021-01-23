import { render, screen, fireEvent } from "@testing-library/react";
import AccessoriesAdder from "./AccessoriesAdder";

describe("Accessories Adder", () => {
  var accessoryList;

  beforeEach(() => {
    accessoryList = [
      { accessory: "Bullbar", weight: 80 },
      { accessory: "Roof Rack", weight: 20 },
      { accessory: "Towbar", weight: 30 },
    ];
  });

  const mockAdd = jest.fn();

  it("Shows the accessories in a form list", () => {
    render(<AccessoriesAdder accessories={accessoryList}></AccessoriesAdder>);

    var accessoryNameFields = screen.getAllByPlaceholderText("Accessory");
    expect(accessoryNameFields[0].value).toBe("Bullbar");
    expect(accessoryNameFields[1].value).toBe("Roof Rack");
    expect(accessoryNameFields[2].value).toBe("Towbar");

    var accessoryWeightFields = screen.getAllByPlaceholderText("kg");
    expect(accessoryWeightFields[0].value).toBe("80");
    expect(accessoryWeightFields[1].value).toBe("20");
    expect(accessoryWeightFields[2].value).toBe("30");
  });

  it("adds the item to the accessories when you select 'Add'", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var addButton = screen.getAllByText(/Add/)[1];
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith({
      accessory: "Roof Rack",
      weight: 20,
    });
  });

  it("adds the item with a custom weight to the accessories", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );
    var field = screen.getAllByPlaceholderText("kg")[2];
    fireEvent.change(field, { target: { value: "100" } });

    var addButton = screen.getAllByText(/Add/)[2];
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith({ accessory: "Towbar", weight: 100 });
  });

  it("Removes the sample accessory from the list when its added", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );

    var addButton = screen.getAllByText(/Add/)[1];
    fireEvent.click(addButton);

    var accessoryNameFields = screen.getAllByPlaceholderText("Accessory");
    expect(accessoryNameFields).toHaveLength(2);
    expect(accessoryNameFields[0].value).toBe("Bullbar");
    expect(accessoryNameFields[1].value).toBe("Towbar");

    var accessoryWeightFields = screen.getAllByPlaceholderText("kg");
    expect(accessoryWeightFields[0].value).toBe("80");
    expect(accessoryWeightFields[1].value).toBe("30");
  });

  it("Removes the sample accessory from the list when its added, even if you change its name", () => {
    render(
      <AccessoriesAdder
        accessories={accessoryList}
        handleAdd={mockAdd}
      ></AccessoriesAdder>
    );

    var field = screen.getAllByPlaceholderText("Accessory")[1];
    fireEvent.change(field, { target: { value: "RhinoRack" } });

    var addButton = screen.getAllByText(/Add/)[1];
    fireEvent.click(addButton);

    var accessoryNameFields = screen.getAllByPlaceholderText("Accessory");
    expect(accessoryNameFields).toHaveLength(2);
    expect(accessoryNameFields[0].value).toBe("Bullbar");
    expect(accessoryNameFields[1].value).toBe("Towbar");

    var accessoryWeightFields = screen.getAllByPlaceholderText("kg");
    expect(accessoryWeightFields[0].value).toBe("80");
    expect(accessoryWeightFields[1].value).toBe("30");
  });
});
