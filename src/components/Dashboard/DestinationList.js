import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DestinationList({ destinations }) {
    return (
        <div>
            <Container>
                <h2 className="text-center my-4">Choose Your Destination</h2>
                <Row>
                    {destinations.map(destination => (
                        <Col key={destination.id} lg={4} md={6} className="mb-4">
                            <Card className="h-100">
                                <Link to={`/destination/${destination.id}`} data-testid={`destination-link-${destination.id}`}>
                                    <Card.Img
                                        alt={destination.name}
                                        variant="top"
                                        src={`http://localhost:3007/uploads/${destination.picture}`}
                                        style={{
                                            height: '200px',
                                            width: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{destination.name}</Card.Title>
                                    <Card.Text>{destination.description}</Card.Text>
                                    <Button variant="primary" as={Link} to={`/destination/${destination.id}`}>
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
