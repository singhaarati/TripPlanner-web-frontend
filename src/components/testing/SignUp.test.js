// Import necessary testing libraries
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from '../Signup';


// Test the SignUp page
describe('SignUp Page', () => {

    it('renders the SignUp form correctly', () => {
        const { getByLabelText, getByText } = render(
            <Router>
                <Signup />
            </Router>
        );

        screen.debug();

        // Assert that the input fields and the Register button are present
        expect(screen.getByLabelText(/Fullname/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        // expect(screen.getByText(/Register/i)).toBeInTheDocument();
    });

    it('updates the input fields correctly', () => {
        const { getByLabelText } = render(
            <Router>
                <Signup />
            </Router>
        );

        // Simulate typing in the input fields
        fireEvent.change(getByLabelText(/Fullname/i), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
        fireEvent.change(getByLabelText(/Username/i), { target: { value: 'john_doe123' } });
        fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

        // Assert that the input fields have been updated correctly
        expect(getByLabelText(/Fullname/i).value).toBe('John Doe');
        expect(getByLabelText(/Email/i).value).toBe('john@example.com');
        expect(getByLabelText(/Username/i).value).toBe('john_doe123');
        expect(getByLabelText(/Password/i).value).toBe('password123');
    });

    // You can write more test cases to simulate form submission, navigation, etc.
});
