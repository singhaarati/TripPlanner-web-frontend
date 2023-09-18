import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom'; // Import the MemoryRouter
import DetailDestination from '../DetailDestination';
// import destinationService from '../../../src/services/destinationService'

test('renders component without error', () => {
    render(
        <MemoryRouter>
            <DetailDestination />
        </MemoryRouter>
    );
});

test('renders loading message', () => {
    // Render the component
    const { getByText } = render(
        <MemoryRouter>
            <DetailDestination />
        </MemoryRouter>);

    // Check if the loading message is displayed
    const loadingMessage = getByText(/Loading.../i);
    expect(loadingMessage).toBeInTheDocument();
});


test('renders DetailDestination correctly', () => {
    // Render the component
    const { asFragment } = render(
        <MemoryRouter>
            <DetailDestination />
        </MemoryRouter>
    );

    // Take a snapshot of the rendered output
    expect(asFragment()).toMatchSnapshot();
});




// test('renders destination name correctly', () => {
//     // Define a sample destination object with a name
//     const destination = {
//       id: 1,
//       name: 'Sample Destination',
//       location: 'Sample Location',
//       price: '$100',
//       picture: 'sample.jpg',
//     };

//     // Render the component, passing the sample destination as a prop
//     const { getByText } = render(
//       <MemoryRouter>
//         <DetailDestination destination={destination} />
//       </MemoryRouter>
//     );

//     // Check if the destination name is present in the rendered component
//     const destinationNameElement = getByText('Sample Destination');
//     expect(destinationNameElement).toBeInTheDocument();
//   });


// test('delete destination button works correctly', () => {
//     // Mock the useNavigate function from react-router-dom
//     const mockNavigate = jest.fn();
//     jest.mock('react-router-dom', () => ({
//         ...jest.requireActual('react-router-dom'),
//         useNavigate: () => mockNavigate,
//     }));

//     // Render the component
//     render(
//         <MemoryRouter>
//             <DetailDestination />
//         </MemoryRouter>
//     );

//     // Simulate the button click
//     const deleteButton = screen.getByText('delete destination');
//     fireEvent.click(deleteButton);

//     // Verify that useNavigate was called and the destination is deleted
//     expect(mockNavigate).toHaveBeenCalledWith('/');
// });