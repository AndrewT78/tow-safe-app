import { render, screen, fireEvent } from "@testing-library/react";
import LoadAdder from "./LoadAdder";

describe("Load Adder", () => {
  var loadList;

  beforeEach(() => {
    loadList = [
      { item: "Passenger", weight: 80, quantity: 2, id: "Passenger1" },
      { item: "Case", weight: 20, quantity: 2, id: "Case1" },
      { item: "Food", weight: 2, quantity: 5, id: "Food1" },
    ];
  });

  const mockAdd = jest.fn();
  const mockRemove = jest.fn();

  it("Shows the load items in a form list", () => {
    render(<LoadAdder load={loadList}></LoadAdder>);

    var loadNameFields = screen.getAllByPlaceholderText("Item Name");
    expect(loadNameFields[0].value).toBe("Passenger");
    expect(loadNameFields[1].value).toBe("Case");
    expect(loadNameFields[2].value).toBe("Food");

    var weightFields = screen.getAllByPlaceholderText("kg");
    expect(weightFields[0].value).toBe("80");
    expect(weightFields[1].value).toBe("20");
    expect(weightFields[2].value).toBe("2");

    var quantityFields = screen.getAllByPlaceholderText("x1");
    expect(quantityFields[0].value).toBe("2");
    expect(quantityFields[1].value).toBe("2");
    expect(quantityFields[2].value).toBe("5");
  });

  it("adds the item to the load when you select 'Add'", () => {
    render(<LoadAdder load={loadList} handleAdd={mockAdd}></LoadAdder>);
    var addButton = screen.getAllByTestId("btn-load-off")[1];
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith({
      item: "Case",
      weight: 20,
      quantity: 2,
      id: "Case1",
    });
  });

  it("adds the item with a custom weight to the load", () => {
    render(<LoadAdder load={loadList} handleAdd={mockAdd}></LoadAdder>);

    var field = screen.getAllByPlaceholderText("kg")[2];
    fireEvent.change(field, { target: { value: "8" } });

    var addButton = screen.getAllByTestId("btn-load-off")[2];
    fireEvent.click(addButton);
    expect(mockAdd).toHaveBeenCalledWith({
      item: "Food",
      weight: 8,
      quantity: 5,
      id: "Food1",
    });
  });

  it("Marks the load as added in the list when its added", () => {
    render(<LoadAdder load={loadList} handleAdd={mockAdd}></LoadAdder>);
    var addButton = screen.getAllByTestId("btn-load-off")[1];
    fireEvent.click(addButton);

    var itemNameFields = screen.getAllByPlaceholderText("Item Name");
    expect(itemNameFields).toHaveLength(3);

    expect(screen.getAllByTestId("btn-load-on")).toHaveLength(1);
    expect(screen.getAllByTestId("btn-load-off")).toHaveLength(2);
  });

  it("Marks the load as added in the list when its added, even if you change its name", () => {
    render(<LoadAdder load={loadList} handleAdd={mockAdd}></LoadAdder>);

    var field = screen.getAllByPlaceholderText("Item Name")[1];
    fireEvent.change(field, { target: { value: "Bags" } });

    var addButton = screen.getAllByTestId("btn-load-off")[1];
    fireEvent.click(addButton);

    var itemNameFields = screen.getAllByPlaceholderText("Item Name");
    expect(itemNameFields).toHaveLength(3);

    expect(screen.getAllByTestId("btn-load-on")).toHaveLength(1);
    expect(screen.getAllByTestId("btn-load-off")).toHaveLength(2);
  });

  it("Prefills the form and sets the load to on when initialised", () => {
    loadList[2].exists = true;

    render(<LoadAdder load={loadList} handleAdd={mockAdd}></LoadAdder>);

    expect(screen.getAllByTestId("btn-load-on")).toHaveLength(1);
    expect(screen.getAllByTestId("btn-load-off")).toHaveLength(2);
  });

  it("removes an item from the list of load", () => {
    render(
      <LoadAdder
        load={loadList}
        handleAdd={mockAdd}
        handleDelete={mockRemove}
      ></LoadAdder>
    );

    var addButton = screen.getAllByTestId("btn-load-off")[1];
    fireEvent.click(addButton);

    var removeButton = screen.getByTestId("btn-load-on");
    fireEvent.click(removeButton);

    expect(mockAdd).toHaveBeenCalledWith({
      item: "Case",
      weight: 20,
      quantity: 2,
      id: "Case1",
    });
    expect(mockRemove).toHaveBeenCalledWith("Case1");
  });
});
