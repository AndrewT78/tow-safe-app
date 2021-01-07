import { render, screen, fireEvent } from '@testing-library/react';
import LoadList from './LoadList';


describe('Load List', () => {

    const load = [
        { item: 'Engel', quantity: 2, weight: 25},
        { item: 'Case', quantity: 4, weight: 15}

    ];

  it('renders a list of the load items', () => {
    render(<LoadList load={load}/>);
    screen.getByText(/Engel/);   
    screen.getByText(/2/);
    screen.getByText(/25/);
    screen.getByText(/Case/);   

  });
});