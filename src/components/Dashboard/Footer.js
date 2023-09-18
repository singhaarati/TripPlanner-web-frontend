import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '30px 0',
  };

  const sectionStyle = {
    flex: 1,
    margin: '0 10px',
  };

  const headingStyle = {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  };

  const textStyle = {
    marginBottom: '0.5rem',
  };

  const linkStyle = {
    color: '#fff',
    marginRight: '10px',
  };

  return (
    <footer data-testid="footer" style={footerStyle}>
      <Container>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={sectionStyle}>
            <h3 style={headingStyle}>About Us</h3>
            <p style={textStyle}>
              The Trip Planner app simplifies
              travel planning,allowing users
              to overview different destinations,
              and book destination they desired.
            </p>
          </div>
          <div style={sectionStyle}>
            <h3 style={headingStyle}>Contact</h3>
            <p style={textStyle}>Thamel, Kathmandu, Nepal</p>
            <p style={textStyle}>Email: tripPlanner@company.com</p>
            <p style={textStyle}>Phone: +977 9836283904</p>
          </div>
          <div style={sectionStyle}>
            <h3 style={headingStyle}>Follow Us</h3>
            <div>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com/yourcompany" target="_blank" rel="noopener noreferrer" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center" style={{ marginTop: '20px' }}>
          <span>&copy; 2023 Trip Planner. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}
