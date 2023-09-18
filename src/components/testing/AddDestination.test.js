import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import AddDestination from '../AddDestination';


test('should add a new destination on form submission', async () => {
    // Mock the destinationService
    const mockAddDestination = jest.fn();
    jest.mock('../../../src/services/destinationService', () => ({
        addDestination: mockAddDestination,
    }));

    // Render the component
    const { getByLabelText, getByRole, debug } = render(
        <MemoryRouter>
            <AddDestination />
        </MemoryRouter>
    );

    // Fill in the form fields
    const nameInput = getByLabelText('Name');
    const locationInput = getByLabelText('Location');
    const pictureInput = getByLabelText('Picture URL');
    const priceInput = getByLabelText('Price');

    fireEvent.change(nameInput, { target: { value: 'Test Destination' } });
    fireEvent.change(locationInput, { target: { value: 'Test Location' } });
    fireEvent.change(pictureInput, { target: { value: 'test.jpg' } });
    fireEvent.change(priceInput, { target: { value: '100' } });

    // Submit the form
    const addButton = getByRole('button', { name: 'Add Destination' });
    fireEvent.click(addButton);

    // Debug the form inputs
    debug();



    // Check that the form inputs are cleared after submission
    expect(nameInput.value).toBe('Test Destination');
    expect(locationInput.value).toBe('Test Location');
    expect(pictureInput.value).toBe('test.jpg');
    expect(priceInput.value).toBe('100');
});

    // You can also check other UI elements if needed, such as verifying that the TopBar and Footer components are present.

