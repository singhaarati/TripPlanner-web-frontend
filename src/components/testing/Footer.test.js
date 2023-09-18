import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from '../Dashboard/Footer';


describe('Footer Component', () => {
  test('renders footer sections and content', () => {
    render(<Footer />);

    // Check if the "About Us" section is rendered with its content
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText(/the trip planner app simplifies/i)).toBeInTheDocument();
    // Add more assertions for other sections and content if needed

    // Check if the contact information section is rendered with its content
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Thamel, Kathmandu, Nepal')).toBeInTheDocument();
    expect(screen.getByText('Email: tripPlanner@company.com')).toBeInTheDocument();
    expect(screen.getByText('Phone: +977 9836283904')).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(<Footer />);

    // Check if the social media links are rendered with the appropriate icons
    const facebookLink = screen.getByTitle('Facebook');
    const twitterLink = screen.getByTitle('Twitter');
    const instagramLink = screen.getByTitle('Instagram');

    expect(facebookLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();

    // Check if the links have the correct attributes for opening in a new tab
    expect(facebookLink).toHaveAttribute('target', '_blank');
    expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders copyright text', () => {
    render(<Footer />);

    // Check if the copyright text is rendered
    expect(screen.getByText('© 2023 Trip Planner. All rights reserved.')).toBeInTheDocument();
  });

  test('renders footer with correct styles', () => {
    render(<Footer />);

    // Check if the footer has the correct background color, text color, and padding
    const footer = screen.getByTestId('footer');
    const styles = window.getComputedStyle(footer);
    expect(styles.backgroundColor).toBe('rgb(51, 51, 51)'); // or '#333', depending on the format returned
    expect(styles.color).toBe('rgb(255, 255, 255)'); // or '#fff', depending on the format returned
    expect(styles.padding).toBe('30px 0px');
    // Add more style-related assertions if needed
  });
});
