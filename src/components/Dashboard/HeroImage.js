import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import heroImage from '../assets/back1.jpg';

const HeroSection = () => {
  return (
    <section className="hero-image">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <img src={heroImage} alt="Hero Image" className="img-fluid" style={{ width: '100%', maxWidth: '500px' }} />
          </Col>
          <Col md={6} className="d-flex justify-content-center align-items-center">
            <div>
              <h1>Your Trip Planner</h1>
              <p>Plan your dream trip with ease and explore the world like never before.</p>

              <a className="btn btn-primary">Get Started</a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
