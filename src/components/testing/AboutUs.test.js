import { render, screen } from '@testing-library/react';
import React from 'react';
import AboutUs from '../Dashboard/AboutUs';


jest.mock('../Dashboard/TopBar.js', () => () => <div data-testid="top-bar">Mocked TopBar</div>);
jest.mock('../Dashboard/Footer.js', () => () => <div data-testid="footer">Mocked Footer</div>);

describe('AboutUs Component', () => {
  test('renders section heading and text', () => {
    render(<AboutUs />);

    // Check if the section heading and paragraphs are rendered
    expect(screen.getByText('About Trip Planner')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Trip Planner is a comprehensive web application designed to simplify the process of planning and organizing your trips. Whether you\'re going on a vacation, business trip, or any other type of travel, Trip Planner provides a seamless experience to help you manage every aspect of your journey.'
      )
    ).toBeInTheDocument();
    // Add more assertions for other paragraphs if needed
  });

  test('renders TopBar and Footer components', () => {
    render(<AboutUs />);

    // Check if the TopBar and Footer components are rendered
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
