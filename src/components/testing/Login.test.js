import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Login from '../Login';

import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter


// Mock the useNavigate and useAuth hooks
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Use the actual implementation for other hooks, such as `useParams`
    Link: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
    useNavigate: () => jest.fn(),
}));

jest.mock('../../../src/utils/authContext.js', () => ({
    useAuth: () => ({
        setUsername: jest.fn(),
    }),
}));

describe('Login Component', () => {

    test('handles form submission', async () => {
        const { getByLabelText, getByText } = render(<Login />);

        const usernameInput = getByLabelText('Username');
        const passwordInput = getByLabelText('Password');
        const loginButton = getByText('Login');

        // Fill in the form inputs
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        // Submit the form
        fireEvent.click(loginButton);
    });



});
