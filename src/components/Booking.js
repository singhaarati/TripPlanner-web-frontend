import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import bookingService from '../services/bookingService';
import Footer from './Dashboard/Footer';


import backgroundImage from './assets/book1.jpg';
import TopBar from './Dashboard/TopBar';

export default function Booking() {
  const [booking, setBooking] = useState({
    fullname: "",
    email: "",
    date: null,
    time: "",
    number: ""
  });
  const { id } = useParams()
  console.log(id)

  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault()
    console.log(booking)
    bookingService.createBookingDestinationById(id, booking)
      .then((res) => {
        console.log(res.data)

        setBooking({
          fullname: "",
          email: "",
          date: null,
          time: "",
          number: ""
        });
        navigate('/');
      })
      .catch((err) => window.alert(err.response.data.error))
  }
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      <TopBar />

      <Container
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '20px',
        }}>
        <h2>Book Your Destination</h2>
        <Form className="mt-4">
          <Form.Group controlId="formfullname">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={booking.fullname}
              onChange={(e) => setBooking({ ...booking, fullname: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={booking.email}
              onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of trip"
              value={booking.date}
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              placeholder="Enter time of trip"
              value={booking.time}
              onChange={(e) => setBooking({ ...booking, time: e.target.value })}
            />
          </Form.Group>

          <Form.Group controlId="formPeople" className="mb-3">
            <Form.Label>Number of People</Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="Enter number of people for trip"
              value={booking.number}
              onChange={(e) => setBooking({ ...booking, number: e.target.value })}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleBooking}>
            Book Destination
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
