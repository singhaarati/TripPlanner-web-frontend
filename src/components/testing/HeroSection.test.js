import { render, screen } from '@testing-library/react';
import React from 'react';
import HeroSection from '../Dashboard/HeroImage';
import 'jest-styled-components';

describe('HeroSection Component', () => {
    test('renders hero image with text and button', () => {
        render(<HeroSection />);

        // Check if the hero image is rendered with the correct alt text and style
        const heroImage = screen.getByAltText('Hero Image');
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveStyle({ width: '100%', maxWidth: '500px' });

        // Check if the heading and paragraph text are rendered
        expect(screen.getByText('Your Trip Planner')).toBeInTheDocument();
        expect(screen.getByText('Plan your dream trip with ease and explore the world like never before.')).toBeInTheDocument();

        // Check if the "Get Started" button is rendered
        const getStartedButton = screen.getByText('Get Started');
        expect(getStartedButton).toBeInTheDocument();
        expect(getStartedButton).toHaveClass('btn btn-primary');
    });

    // ... other test cases ...

    test('renders hero image with correct URL', () => {
        render(<HeroSection />);

        const heroImage = screen.getByAltText('Hero Image');
        expect(heroImage.src).toContain('back1.jpg'); // Assuming the image URL contains 'back1.jpg'
    });

    test('renders heading and paragraph text with correct styles', () => {
        render(<HeroSection />);

        const heading = screen.getByText('Your Trip Planner');
        const headingStyles = window.getComputedStyle(heading);
        expect(headingStyles.fontSize).toBe('1.5em');
        //expect(headingStyles.marginBottom).toBe('1rem');

        const paragraph = screen.getByText('Plan your dream trip with ease and explore the world like never before.');
        const paragraphStyles = window.getComputedStyle(paragraph);
        //expect(paragraphStyles.marginBottom).toBe('0.5rem');
    });

    test('renders "Get Started" button as a link with correct attributes', () => {
        render(<HeroSection />);

        const getStartedButton = screen.getByText('Get Started');
        expect(getStartedButton.tagName).toBe('A'); // Check if it's an anchor tag (link)
        expect(getStartedButton.href).toContain(""); // Assuming the correct href for the button
        expect(getStartedButton.target).toBe(""); // Assuming the button opens in a new tab
        expect(getStartedButton.rel).toBe(""); // Assuming correct rel attribute
    });
});
