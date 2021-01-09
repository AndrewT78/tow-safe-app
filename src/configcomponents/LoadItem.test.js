import { render, screen, fireEvent } from '@testing-library/react';
import LoadItem from './LoadItem';


describe('Load Item', () => {

  const load = { item: 'Engel', quantity: 2, weight: 25, id: "Engel1"};
        
  const mockDelete = jest.fn();

  it('renders the load item', () => {
    render(<LoadItem item={load} handleDelete={mockDelete}/>);
    screen.getByText(/Engel/);
    screen.getByText(/2/);
    screen.getByText(/25/);        
  });

  it('deletes the item when the delete button is pressed', () => {    
    render(<LoadItem item={load} handleDelete={mockDelete}/>);

    const deleteButton = screen.getByTestId('delete-load-Engel1');
    fireEvent.click(deleteButton);   

    expect(mockDelete).toHaveBeenCalledWith("Engel1");

  });
});