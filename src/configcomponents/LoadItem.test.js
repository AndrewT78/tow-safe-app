import { render, screen, fireEvent } from '@testing-library/react';
import LoadItem from './LoadItem';


describe('Load Item', () => {

    const load = { item: 'Engel', quantity: 2, weight: 25};
        

  it('renders the load item', () => {
    render(<LoadItem item={load}/>);
    screen.getByText(/Engel/);
    screen.getByText(/2/);
    screen.getByText(/25/);        
  });
});