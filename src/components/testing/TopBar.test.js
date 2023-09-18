import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TopBar from '../Dashboard/TopBar';

// Mock the useAuth hook before importing TopBar
jest.mock('../../../src/utils/authContext.js', () => ({
  useAuth: () => ({ username: 'JohnDoe' }), // Set the auth context here for testing
}));

const renderWithRouter = () => {
  render(
    <MemoryRouter>
      <TopBar />
    </MemoryRouter>
  );
};

beforeEach(() => {
    jest.resetModules(); // Reset the module's cache before each test
  });

test('renders TopBar component with logo and menu items', () => {
  renderWithRouter();

  // Check if the logo is rendered
  const logoElement = screen.getByAltText('Your Logo');
  expect(logoElement).toBeInTheDocument();

  // Check if menu items are rendered
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('About Us')).toBeInTheDocument();
  expect(screen.getByText('My Bookings')).toBeInTheDocument();
  expect(screen.getByText('Add Destination')).toBeInTheDocument();
});

test('displays the username in the dropdown when user is logged in', () => {
  renderWithRouter();

  // Open the dropdown
  const dropdownToggle = screen.getByTestId('dropdown-toggle');
  fireEvent.click(dropdownToggle);

  // Check if the username is displayed in the dropdown menu
  expect(screen.getByText('Welcome, JohnDoe')).toBeInTheDocument();
});

// test('shows login and signup options in the dropdown when user is not logged in', () => {
//   // Set the auth context to null for testing when the user is not logged in
//   jest.mock('../../../src/utils/authContext.js', () => ({
//     useAuth: () => ({ username: null }),
//   }));

//   renderWithRouter();

//   // Open the dropdown
//   const dropdownToggle = screen.getByTestId('dropdown-toggle');
//   fireEvent.click(dropdownToggle);

//   // Check if the 'Login' and 'Signup' options are displayed in the dropdown menu
//   const loginOption = screen.queryByText('Login');
//   const signupOption = screen.queryByText('Signup');

//   // If the user is not logged in, both loginOption and signupOption should be present
//   expect(loginOption).toBeInTheDocument();
//   expect(signupOption).toBeInTheDocument();
// });
