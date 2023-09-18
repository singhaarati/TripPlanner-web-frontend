import { render, screen } from '@testing-library/react';
import React from 'react';
import MyBookingsList from '../MyBookings';
import { MemoryRouter } from 'react-router-dom';

test('renders the component', () => {
    render(
        <MemoryRouter>
            <MyBookingsList />
        </MemoryRouter>
    );
    // Check if the header is rendered
    const headerElement = screen.getByText(/My Trips/i);
    expect(headerElement).toBeInTheDocument();

    // Check if the loading message is displayed
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
});
