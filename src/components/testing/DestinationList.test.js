import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DestinationList from '../Dashboard/DestinationList';



// Mock the destinations data for testing
const mockDestinations = [
    {
        id: 1,
        name: 'Test Destination 1',
        description: 'Test description for Destination 1',
        picture: 'destination1.jpg',
    },
    {
        id: 2,
        name: 'Test Destination 2',
        description: 'Test description for Destination 2',
        picture: 'destination2.jpg',
    },
];

test('renders destination cards with correct data', () => {
    render(
        <Router>
            <DestinationList destinations={mockDestinations} />
        </Router>
    );

    // Check if "Choose Your Destination" heading is rendered
    const heading = screen.getByText(/Choose Your Destination/i);
    expect(heading).toBeInTheDocument();

    // Check if destination cards are rendered correctly
    const destinationCards = screen.getAllByTestId(/destination-link-/i);
    expect(destinationCards).toHaveLength(mockDestinations.length);

    // Check if destination names are rendered correctly
    mockDestinations.forEach((destination, index) => {
        const destinationName = screen.getByText(destination.name);
        expect(destinationName).toBeInTheDocument();

        // Check if destination descriptions are rendered correctly
        const destinationDescription = screen.getByText(destination.description);
        expect(destinationDescription).toBeInTheDocument();

        // Check if "View Details" button links are set correctly
        const viewDetailsButton = screen.getByTestId(`destination-link-${destination.id}`);
        expect(viewDetailsButton).toHaveAttribute('href', `/destination/${destination.id}`);
    });

    // Ensure that images are rendered with correct src attribute
    const destinationImages = screen.getAllByRole('img');
    destinationImages.forEach((image, index) => {
        expect(image).toHaveAttribute(
            'src',
            `http://localhost:3007/uploads/${mockDestinations[index].picture}`
        );
    });
});


test('sets correct "View Details" button links', () => {
    render(
        <Router>
            <DestinationList destinations={mockDestinations} />
        </Router>
    );

    mockDestinations.forEach((destination, index) => {
        const viewDetailsButton = screen.getByTestId(`destination-link-${destination.id}`);
        expect(viewDetailsButton).toHaveAttribute('href', `/destination/${destination.id}`);
    });
});


test('displays destination cards in proper layout', () => {
    render(
        <Router>
            <DestinationList destinations={mockDestinations} />
        </Router>
    );
});


test('renders destination images with correct src attribute', () => {
    render(
        <Router>
            <DestinationList destinations={mockDestinations} />
        </Router>
    );

    mockDestinations.forEach((destination, index) => {
        const destinationImage = screen.getByAltText(destination.name);
        expect(destinationImage).toHaveAttribute(
            'src',
            `http://localhost:3007/uploads/${destination.picture}`
        );
    });
});

test('does not display a message when destinations array is not empty', () => {
    const mockDestinations = [
        // Add mock destination data here as needed
    ];

    render(
        <Router>
            <DestinationList destinations={mockDestinations} />
        </Router>
    );

    // Check if the "No destinations available." message is NOT rendered
    const emptyMessage = screen.queryByText(/No destinations available./i);
    expect(emptyMessage).not.toBeInTheDocument();
});

