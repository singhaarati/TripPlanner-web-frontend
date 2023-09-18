import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';
import TopBar from './TopBar';

export default function AboutUs() {
  return (
    <section className="section-about">
      <Container>
        <TopBar/>
        <h2 className="section-heading">About Trip Planner</h2>
        <p className="section-text">
          Trip Planner is a comprehensive web application designed to simplify the process of planning and organizing your trips. Whether you're going on a vacation, business trip, or any other type of travel, Trip Planner provides a seamless experience to help you manage every aspect of your journey.
        </p>
        <p className="section-text">
          With Trip Planner, you can easily create and manage itineraries for your trips. The app allows you to input your destination, travel dates, and activities, and it will generate a customized itinerary for you. You can add attractions, landmarks, restaurants, and other points of interest to your itinerary, ensuring that you make the most of your time at each location.
        </p>
        <p className="section-text">
          Additionally, Trip Planner provides real-time information on flights, hotels, and transportation options. You can search for and book flights directly within the app, compare hotel prices, and find the best transportation options for getting around your destination. The app seamlessly integrates with popular travel services and platforms, making it convenient to access all your travel information in one place.
        </p>
        <p className="section-text">
          Our mission is to make travel planning easy, efficient, and enjoyable for all travelers. Whether you're a frequent traveler or planning your first trip, Trip Planner is designed to enhance your journey and make your travel planning a breeze.
        </p>
      </Container>
      <Footer/>
    </section>
  );
}
